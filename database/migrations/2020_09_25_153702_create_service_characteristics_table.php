<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiceCharacteristicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_characteristics', function (Blueprint $table) {
			$table->integer('service_id')->unsigned();
			$table->integer('characteristic_id')->unsigned();
			$table->primary(['service_id', 'characteristic_id']);
			$table->foreign('service_id')
				->references('id')->on('services')->onDelete('cascade');
			$table->foreign('characteristic_id')
				->references('id')->on('characteristics')->onDelete('cascade');
			$table->string('value', 100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_characteristics');
    }
}
