<x-mail::message>
# Nouveau message de contact

Un nouveau message vient d'être envoyé depuis le formulaire de contact du site.

**Nom :** {{ $contact->name }}
**E-mail :** {{ $contact->email }}
@if($contact->phone)
**Téléphone :** {{ $contact->phone }}
@endif
@if($contact->subject)
**Objet :** {{ $contact->subject }}
@endif

**Message :**
{{ $contact->message }}

<x-mail::button :url="$adminUrl">
Voir les messages
</x-mail::button>

Merci,<br>
{{ config('app.name') }}
</x-mail::message>
