<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_services', function (Blueprint $table) {
			$table->integer('category_id')->unsigned();
			$table->integer('service_id')->unsigned();
			$table->primary(['category_id', 'service_id']);
			$table->foreign('category_id')
				->references('id')->on('categories')->onDelete('cascade');
			$table->foreign('service_id')
				->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category_services');
    }
}
