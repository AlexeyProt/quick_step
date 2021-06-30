<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\FeedbackShipped;
use App\Services\Recaptcha;

class FeedbackController extends Controller
{
    public function send(Request $request, Recaptcha $recaptcha) {
		$recaptcha->check();
		
		$customer = new \App\Customer($request->all());
		
		Mail::to('spblaminat@mail.ru')->send(new FeedbackShipped($customer));
	}
}
