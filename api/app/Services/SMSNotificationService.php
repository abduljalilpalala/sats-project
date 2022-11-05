<?php

namespace App\Services;

use Twilio\Rest\Client;

class SMSNotificationService
{
  public static function sendSMS(String $contactNumber): void
  {
    $client = new Client(env('TWILIO_SID'), env('TWILIO_TOKEN'));
    $client->messages->create("+63" . substr($contactNumber, 1), [
      'from' => env('TWILIO_FROM'),
      'body' => "Good day! Your application has been approved from SATS!"
    ]);
  }
}
