<x-mail::message>
# Nouvelle demande RFQ

Une nouvelle demande vient d'être soumise sur le site.

**Référence :** {{ $rfq->reference }}
**Catégorie :** {{ ucfirst($rfq->category) }}
**Type :** {{ str_replace('_', ' ', $rfq->type) }}
**Sujet :** {{ $rfq->subject }}

**Nom :** {{ $rfq->name }}
@if($rfq->company)
**Entreprise :** {{ $rfq->company }}
@endif
**Téléphone :** {{ $rfq->phone }}
@if($rfq->whatsapp)
**WhatsApp :** {{ $rfq->whatsapp }}
@endif
**E-mail :** {{ $rfq->email }}
@if($rfq->city || $rfq->country)
**Localisation :** {{ implode(', ', array_filter([$rfq->city, $rfq->country])) }}
@endif
@if($rfq->quantity)
**Quantité :** {{ $rfq->quantity }}
@endif
@if($rfq->budget)
**Budget :** {{ $rfq->budget }}
@endif
@if($rfq->deadline)
**Délai souhaité :** {{ $rfq->deadline->format('d/m/Y') }}
@endif
@if($rfq->delivery_location)
**Lieu de livraison :** {{ $rfq->delivery_location }}
@endif

@if($rfq->description)
**Description :**
{{ $rfq->description }}
@endif

<x-mail::button :url="$adminUrl">
Voir la demande
</x-mail::button>

Merci,<br>
{{ config('app.name') }}
</x-mail::message>
