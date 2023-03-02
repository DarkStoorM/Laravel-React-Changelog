<?php

// Placeholder

use Illuminate\Http\JsonResponse;

/**
 * Returns a fixed JsonResponse for regular message responses, that don't need additional Data
 *
 * @param   string  $message  Message received from the server
 * @param   mixed   $data     Optional data returned by the server
 */
function json_response(string $message, $statusCode = 200): JsonResponse
{
    $response = json_encode(['status' => $statusCode, 'message' => $message]);

    return response()->json($response, $statusCode);
}
