function tabs(tabsSelector, tabsContentSelector, tabsWrapperSelector, activityClass) {
	// Tabs
	const tabs = document.querySelectorAll(tabsSelector);
	const tabsContent = document.querySelectorAll(tabsContentSelector);
	const tabsWrapper = document.querySelector(tabsWrapperSelector);

	hideTabContent();
	showTabContent();

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove(activityClass);
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');

		tabs[i].classList.add(activityClass);
	}

	tabsWrapper.addEventListener('click', (e) => {
		e.preventDefault();

		let target = e.target;

		if(target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if(target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

export {tabs};