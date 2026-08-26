<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('About');
    }

    public function trading(): Response
    {
        return Inertia::render('Trading');
    }

    public function logistics(): Response
    {
        return Inertia::render('Logistics');
    }

    public function distribution(): Response
    {
        return Inertia::render('Distribution');
    }

    public function resources(): Response
    {
        return Inertia::render('Resources');
    }
}
