<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::where('status', 'publie')
                ->latest('project_date')
                ->get(),
        ]);
    }

    public function show(string $slug): Response
    {
        $project = Project::where('slug', $slug)
            ->where('status', 'publie')
            ->firstOrFail();

        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }
}
