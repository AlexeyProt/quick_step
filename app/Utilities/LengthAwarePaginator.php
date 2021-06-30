<?php

namespace App\Utilities;

class LengthAwarePaginator extends \Illuminate\Pagination\LengthAwarePaginator
{
    /**
     * Get the URL for a given page number.
     *
     * @param  int  $page
     * @return string
     */
    public function url($page)
    {
        if ($page <= 1) {
			return $this->path;
        }

        // If we have any extra query string key / value pairs that need to be added
        // onto the URL, we will put them in query string form and then attach it
        // to the URL. This allows for extra information like sortings storage.
        $parameters = [$this->pageName => $page];

        if (count($this->query) > 0) {
            $parameters = array_merge($this->query, $parameters);
        }
        return $this->path.'/'.$page;
    }	
}
