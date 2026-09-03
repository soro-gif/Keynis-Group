<x-mail::message>
# Candidature partenaire confirmée

Le candidat vient de valider les informations de sa candidature sur le site.

**Raison sociale :** {{ $partner->company_name }}
**Catégorie :** {{ str_replace('_', ' ', $partner->category) }}
@if($partner->sector)
**Secteur d'activité :** {{ $partner->sector }}
@endif

**Nom du responsable :** {{ $partner->contact_name }}
**Pays :** {{ $partner->country }}
@if($partner->city)
**Ville :** {{ $partner->city }}
@endif
**Téléphone :** {{ $partner->phone }}
@if($partner->whatsapp)
**WhatsApp :** {{ $partner->whatsapp }}
@endif
**E-mail :** {{ $partner->email }}
@if($partner->website)
**Site internet :** {{ $partner->website }}
@endif

@if($partner->products_services)
**Produits / services proposés :**
{{ $partner->products_services }}
@endif
@if($partner->capacities)
**Capacités :**
{{ $partner->capacities }}
@endif
@if($partner->message)
**Message :**
{{ $partner->message }}
@endif

<x-mail::button :url="$adminUrl">
Voir la candidature
</x-mail::button>

Merci,<br>
{{ config('app.name') }}
</x-mail::message>
