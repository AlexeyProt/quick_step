/* Примесь для сортировки узлов */
var sortNodesMixin = {
	elementsArray: [],
	store: {},
	// Добавляются узлы в массив
	addNodes: function (nodesArray) {
		for ( var i = 0; i < nodesArray.length; i++ ) {
			if (!this.store[nodesArray[i].dataset.name]) {
				this.elementsArray.push({ elem: nodesArray[i], value: nodesArray[i].dataset.name });
				this.store[nodesArray[i].dataset.name] = true;
			}	
		}
	},
	// Сортируются добавленные узлы, как строки
	sortNodes: function () {
		this.elementsArray.sort(function (a, b) {
			if (a.value > b.value) return 1;
			if (a.value < b.value) return -1;
		});
	}
};