<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductGroupViewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_group_views', function (Blueprint $table) {
            $table->integer('product_group_id')->unsigned();
			$table->integer('page_id')->unsigned();
			$table->foreign('product_group_id')
				->references('id')->on('product_groups')->onDelete('cascade');
			$table->foreign('page_id')
				->references('id')->on('pages')->onDelete('cascade');	
			$table->primary(['product_group_id', 'page_id']);	
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_group_views');
    }
}
