/**
 * Réveil de l'instance Render gratuite.
 *
 * Render arrête un service `plan: free` après ~15 min sans requête entrante.
 * Le visiteur suivant voit alors la page « Welcome to Render » pendant que le
 * conteneur redémarre. Ce Worker envoie une requête sur /up toutes les 5 min
 * (voir wrangler.toml) : l'instance ne s'endort donc jamais.
 *
 * Cloudflare n'a pas la bride de GitHub Actions sur les crons, et le domaine
 * keynisgroup.ci est déjà géré par Cloudflare — d'où ce choix.
 */

/** Démarrage à froid observé : 40 à 60 s. On laisse de la marge. */
const WAKE_TIMEOUT_MS = 100_000;

export default {
  /** Déclenché par le cron Cloudflare (voir [triggers] dans wrangler.toml). */
  async scheduled(controller, env, ctx) {
    ctx.waitUntil(wake(env.ORIGIN_URL));
  },

  /** Déclenchement manuel : GET https://<worker>/? */
  async fetch(request, env) {
    const result = await wake(env.ORIGIN_URL);

    return Response.json(result, { status: result.ok ? 200 : 502 });
  },
};

/**
 * Tire une requête sur /up et rend compte du résultat.
 *
 * Un abandon côté client (timeout) n'annule pas le réveil : Render démarre le
 * conteneur dès réception de la requête, même si le client raccroche avant la
 * réponse.
 *
 * @param {string} originUrl
 * @returns {Promise<{ok: boolean, status?: number, ms: number, error?: string}>}
 */
async function wake(originUrl) {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WAKE_TIMEOUT_MS);

  try {
    const response = await fetch(originUrl, {
      signal: controller.signal,
      headers: { 'user-agent': 'keynis-keep-alive/1.0 (+https://keynisgroup.ci)' },
    });

    // Lire le corps garantit que l'échange est terminé côté Render.
    await response.arrayBuffer();

    return {
      ok: response.ok,
      status: response.status,
      ms: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ok: false,
      ms: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}
