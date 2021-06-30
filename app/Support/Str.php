<?php

namespace App\Support;

class Str
{
	
    /**
     * Возвращает форму множественного числа.
     *
     * @param  string  $value 1-ое склонение|2-ое склонение|3-е склонение
     * @param  int     $count
     * @return string
     */
    public static function plural($value, $count = 2)
    {
		$value = explode('|', $value);
		$keys = [2, 0, 1, 1, 1, 2];
		return $value[$count % 100 > 4 && $count % 100 < 20 ? 2 : $keys[min($count % 10, 5)]];        
    }
}
