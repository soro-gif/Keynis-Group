<x-mail::message>
# Message de contact confirmé

L'expéditeur vient de valider les informations de son message sur le site.

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
