<?php

namespace App\Mail;

use App\Models\Rfq;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VehicleRfqSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Rfq $rfq)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Nouvelle demande de véhicule — {$this->rfq->reference}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.vehicle-rfq-submitted',
            with: [
                'rfq' => $this->rfq,
                'adminUrl' => route('admin.rfqs.show', $this->rfq),
            ],
        );
    }
}
