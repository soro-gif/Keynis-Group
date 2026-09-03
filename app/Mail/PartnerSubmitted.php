<?php

namespace App\Mail;

use App\Models\Partner;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PartnerSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Partner $partner)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Nouvelle candidature partenaire — {$this->partner->company_name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.partner-submitted',
            with: [
                'partner' => $this->partner,
                'adminUrl' => route('admin.partners.show', $this->partner),
            ],
        );
    }
}
