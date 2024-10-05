const repairPopUpDateBaseUpd = (db) => {
	const base = db;
	const popUpRepairTypesContainer = document.querySelector('.popup-repair-types');

	// fetch version
	// const postData = () => {
	// 	return fetch(base, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},
	// 	});
	// };

	const tabElementActive = `
		<button class="button_o popup-repair-types-nav__item activeIt">Потолок: Демонтажные работы</button>
	`;

	const tabElement = `
		<button class="button_o popup-repair-types-nav__item">Потолок: Монтажные работы</button>
	`;

	const tabElementBlocks = `
		<div class="nav-list nav-list-popup-repair">
			${tabElementActive}
			${tabElement}
			${tabElement}
			${tabElement}
			${tabElement}
			${tabElement}
		</div>
	`;

	const hotDataChanges = (body) => {
		let tabButtonsBlock = document.querySelector('.nav-list-popup-repair');
		tabButtonsBlock.innerHTML = `
			${tabElementBlocks}
		`;

		let tabButtons = document.querySelectorAll('.popup-repair-types-nav__item');
		body.forEach((jsonObj, ind) => {
			tabButtons[ind].textContent = jsonObj.title;
		});
	};

	const generateAllTables = (body) => {

		const generateTabEl = (body) => {

			let createTableElement = '';
				
				for(let type of body.priceList) {

					createTableElement += `
											<tr class="mobile-row showHide">
												<td class="repair-types-name">${type.typeService}</td>
												<td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
												<td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
												<td class="repair-types-valueCI">${type.units}</sup></td>
												<td class="repair-types-value">${type.cost} руб.</td>
											</tr>
										`;
				}
				return createTableElement;
		};

		let tableWrap = document.querySelector('.popup-repair-types-content-table');
		for(let items of body) {
			tableWrap.insertAdjacentHTML('beforeend', `
				<table class="popup-repair-types-content-table__list">
				<tbody>
					${generateTabEl(items)}
				</tbody>
				</table>
			`);
		}
	}


	const start = (data) => {
		const dateHeader = document.querySelector('.popup-repair-types-content__head-date');
		dateHeader.textContent = data[0].date;
		data = data.filter(item => item.title);
		hotDataChanges(data);
		generateAllTables(data);
	}

	start(base);


	// fetch version
	// postData().then(response => {
	// 	if (response.status !== 200) {
	// 		throw new Error(`response status is't 200!`);
	// 	}
	// 	return response.text();
	// })
	// .then(data => { 
	// 	data = JSON.parse(data);
	// const dateHeader = document.querySelector('.popup-repair-types-content__head-date');
	// dateHeader.textContent = data[0].date;
	// 	data = data.filter(item => item.title);
	// 	hotDataChanges(data);
	// generateAllTables(data);
	// 	// return data;
	// })
	// .then(data=> {
		// start(base);
	// })

	popUpRepairTypesContainer.addEventListener('click', e => {
		let targ = e.target;

		let popUpTittle = document.getElementById('switch-inner');
		// tabs
		let tabButtons = document.querySelectorAll('.popup-repair-types-nav__item');
		// tables
		let allTables = document.querySelectorAll('.popup-repair-types-content-table__list');
		// console.log(repairTypesNames);
	// tables switcher
		for (let j = 0; j < tabButtons.length; j++) {

			if (targ === tabButtons[j]) {

				for (let i = 0; i < allTables.length; i++) {
					tabButtons[i].classList.remove('activeIt');
					allTables[i].style.display = 'none';

					if (targ === tabButtons[i]) {
						popUpTittle.textContent = tabButtons[i].textContent;
						tabButtons[j].classList.add('activeIt');
						allTables[i].style.display = 'block';
					}
				}
			}
		}
	});


};

export default repairPopUpDateBaseUpd;