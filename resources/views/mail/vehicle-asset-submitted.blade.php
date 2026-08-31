<x-mail::message>
# Nouveau véhicule proposé

Un propriétaire vient de proposer un véhicule sur le site (formulaire « Je propose un actif »).

**Actif :** {{ $asset->name }}
@if($asset->brand || $asset->model)
**Marque / Modèle :** {{ implode(' ', array_filter([$asset->brand, $asset->model])) }}
@endif
@if($asset->year)
**Année :** {{ $asset->year }}
@endif
@if($asset->registration)
**Immatriculation :** {{ $asset->registration }}
@endif

**Propriétaire :** {{ $asset->owner_name }}
@if($asset->owner_company)
**Entreprise :** {{ $asset->owner_company }}
@endif
**Téléphone :** {{ $asset->owner_phone }}
@if($asset->owner_whatsapp)
**WhatsApp :** {{ $asset->owner_whatsapp }}
@endif
@if($asset->owner_email)
**E-mail :** {{ $asset->owner_email }}
@endif
@if($asset->city)
**Ville :** {{ $asset->city }}
@endif

@if($asset->description)
**Observations :**
{{ $asset->description }}
@endif

<x-mail::button :url="$adminUrl">
Voir l'actif
</x-mail::button>

Merci,<br>
{{ config('app.name') }}
</x-mail::message>
