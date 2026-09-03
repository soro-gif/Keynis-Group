<?php

namespace App\Mail;

use App\Models\Partner;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PartnerConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Partner $partner)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Candidature partenaire confirmée — {$this->partner->company_name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.partner-confirmed',
            with: [
                'partner' => $this->partner,
                'adminUrl' => route('admin.partners.show', $this->partner),
            ],
        );
    }
}
