<?php

namespace App\Mail;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Contact $contact)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Nouveau message de contact — {$this->contact->name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.contact-form-submitted',
            with: [
                'contact' => $this->contact,
                'adminUrl' => route('admin.contacts.index'),
            ],
        );
    }
}
