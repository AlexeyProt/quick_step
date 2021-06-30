<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiceUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_units', function (Blueprint $table) {
			$table->integer('service_id')->unsigned();
			$table->integer('unit_id')->unsigned();
			$table->primary(['service_id', 'unit_id']);
			$table->foreign('service_id')
				->references('id')->on('services')->onDelete('cascade');
			$table->foreign('unit_id')
				->references('id')->on('units')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_units');
    }
}
