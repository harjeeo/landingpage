<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Public endpoint — called by both the Ojar site and the Designs Clue
     * site's own contact/demo forms, each tagging its own `source`.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'contact' => ['required', 'string', 'max:255'],
            'source' => ['required', 'in:dc,ojar'],
            'source_page' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string'],
        ]);

        $lead = Lead::create($data);

        return response()->json($lead, 201);
    }

    /**
     * Super Admin only — every lead from both sites, newest first.
     */
    public function index(Request $request)
    {
        $leads = Lead::query()
            ->orderByDesc('created_at')
            ->paginate($request->integer('pageSize', 20));

        return response()->json([
            'items' => $leads->items(),
            'total' => $leads->total(),
            'page' => $leads->currentPage(),
            'pageSize' => $leads->perPage(),
        ]);
    }
}
