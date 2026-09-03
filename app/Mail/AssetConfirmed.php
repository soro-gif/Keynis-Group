<?php

namespace App\Mail;

use App\Models\Asset;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AssetConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Asset $asset)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Actif confirmé — {$this->asset->name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.asset-confirmed',
            with: [
                'asset' => $this->asset,
                'adminUrl' => route('admin.assets.show', $this->asset),
            ],
        );
    }
}
