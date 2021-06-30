"use strict";
class Pagination {
	constructor(container) {
		this._container = container;
		
		/** 
		* url начальной страницы пагинации
		*
		* @var string
		*/
		this.url;
		
		/** 
		* url текущей страницы пагинации
		*
		* @var string
		*/		
		this.currentUrl;

		this._progressAnim = new ProgressAnimation(this._container.querySelector('.progressContainer'));		
		this._paginationElem = container.querySelector('#pagination').content.children[0];
		this._snackbar = new Snackbar();
		
		this._addEventListeners();
	}
	
	/** 
	* Устанавливает обработчик для построения элементов пагинации
	*
	* @param function handler
	*/
	setBuildItemsCB(handler) {
		this.buildItems = handler;
	}
	
	/** 
	* Прокручивает данные пигинации наверх
	*/
	_scrollToTop() {
		for (let target = this._container; target; target = target.parentNode) {
			if (!target.scrollTop) continue;
			
			target.scrollTop = 0;
			
			return;
		}
	}
	
	async followLink(target, url = this.url) {
		let items = await this.loadItems(url);
		
		target.dispatchEvent(new CustomEvent('followlink', {
			detail: {
				href: url,
				handler: () => this.buildItems(items),
			},
			bubbles: true
		}));		
		
		this.buildItems(items);		
	}
	
	/** 
	* Оторображает страницу пагинации
	*/
	async _showPaginationPage(event) {
		if (event.target.nodeName != 'A') return;
		
		event.preventDefault();
		
		await this.followLink(event.target, event.target.href);
			
		this._scrollToTop();
		
		
	}

	/** 
	* Загружает данные пагинации
	*
	* @param string url страница пагинации
	* @return object
	*/
	async loadItems(url = this.url) {
		this._progressAnim.start();
		
		try {
			let response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
				}				
			});
			
			this.currentUrl = url;
			
			return await response.json();			
		} catch (e) {
			this._snackbar.show('Произошла ошибка. Попробуйте еще раз');
			
			throw new Error(e);
		} finally {
			this._progressAnim.stop();
		}
	}	
	
	/**
	* Строит список страниц пагинации
	*
	* @param object paginationData
	*/
	buildPagination(paginationData) {
		this._paginationElem.innerHTML = '';
		this._paginationElem.remove();
		
		if (paginationData.last_page == 1) return;
		
		let li = document.createElement('li');
		
		this._container.append(this._paginationElem);
		
		if (paginationData.prev_page_url) {
			let prevLI = li.cloneNode(false);
			prevLI.rel = 'prev';
			prevLI.innerHTML = `<a href="${paginationData.prev_page_url}">&laquo;</a>`;
			
			this._paginationElem.append(prevLI);
		}
		for (let i = 1; i <= paginationData.last_page; i++) {
			let pageLI = li.cloneNode(false);
			
			if (i == paginationData.current_page) {
				pageLI.className = 'active';
				pageLI.innerHTML = `<span>${i}</span>`;
			} else {
				pageLI.innerHTML = `<a href="${paginationData.path}/${i}">${i}</a>`;				
			}
			this._paginationElem.append(pageLI);
		}
		if (paginationData.next_page_url) {
			let nextLI = li.cloneNode(false);
			nextLI.rel = 'next';
			nextLI.innerHTML = `<a href="${paginationData.next_page_url}">&raquo;</a>`;
			
			this._paginationElem.append(nextLI);
		}		
	}

	_addEventListeners() {
		this._paginationElem.addEventListener('click', () => this._showPaginationPage(event));	
	}	
}