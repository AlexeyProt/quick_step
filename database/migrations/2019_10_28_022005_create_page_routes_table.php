<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePageRoutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_routes', function (Blueprint $table) {
			$table->integer('route_id')->unsigned();
			$table->foreign('route_id')
				->references('id')->on('routes')->onDelete('cascade');				
			$table->integer('page_id')->unsigned();
			$table->foreign('page_id')
				->references('id')->on('pages')->onDelete('cascade');	
			$table->primary(['route_id', 'page_id']);		
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('page_routes');
    }
}
