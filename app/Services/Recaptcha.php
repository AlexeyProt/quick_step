<?php

namespace App\Services;

use Illuminate\Http\Request;

class Recaptcha
{
    const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';
    const RECAPTCHA_SECRET = '6LdwdgcaAAAAABOt8CH6OhuPhfJJNkrTJanaRVaO';	
	
	protected $request;
	
	public function __construct(Request $request) {
		$this->request = $request;
	}
	
	public function response() {
		$response = file_get_contents(self::RECAPTCHA_URL . '?secret=' . self::RECAPTCHA_SECRET . '&response=' . $this->request->input('recaptcha_response'));		
		
		return json_decode($response);
	}
	
	public function check() {
		$response = $this->response();
		
		if ($response->score < 0.5) abort(500);
	}
}
