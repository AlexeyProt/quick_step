<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSaleStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sale_statuses', function (Blueprint $table) {
			$table->integer('sale_id')->unsigned();
			$table->integer('status_id')->unsigned();
			$table->primary(['sale_id', 'status_id']);
			$table->foreign('sale_id')
				->references('id')->on('sales')->onDelete('cascade');
			$table->foreign('status_id')
				->references('id')->on('statuses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sale_statuses');
    }
}
