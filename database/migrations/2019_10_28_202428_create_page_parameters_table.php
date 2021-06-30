<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePageParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_parameters', function (Blueprint $table) {
			$table->integer('page_id')->unsigned();
			$table->foreign('page_id')
				->references('id')->on('pages')->onDelete('cascade');	
			$table->integer('parameterizable_id')->unsigned();	
			$table->string('parameterizable_type', 50);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('page_parameters');
    }
}
