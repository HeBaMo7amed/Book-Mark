var bookMark = JSON.parse(localStorage.getItem('bookMark')) || [];

document.addEventListener('DOMContentLoaded', function () {
    var searchBar = document.querySelector('#search-bar');
    var dataContainer = document.querySelector('#dataa');
    var submitBtn = document.querySelector('#submitBtn');
    var siteNameInput = document.querySelector('#SiteName');
    var siteURLInput = document.querySelector('#SiteURL');
    var lightBoxContainer = document.querySelector('#lightBoxContainer');
    var closingIcon = document.querySelector('#closingIcon');
    lightBoxContainer.classList.add('d-flex');
    displaySites(bookMark);

    searchBar.addEventListener('input', function () {
        var searchTerm = searchBar.value;
        searchSite(searchTerm);
    });

    submitBtn.addEventListener('click', function () {
        var siteName = siteNameInput.value;
        var siteURL = siteURLInput.value;
        var valid = true;

        var englishPattern = /^[a-zA-Z\s]+$/;
        if (siteName.length < 3 || !englishPattern.test(siteName)) {

            siteNameInput.classList.add('is-invalid');
            valid = false;
        } else {

            siteNameInput.classList.remove('is-invalid');
        }
        var urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,}(\/[\w\d-]*)*$/i;
        if (!urlPattern.test(siteURL)) {

            siteURLInput.classList.add('is-invalid');
            valid = false;
        } else {

            siteURLInput.classList.remove('is-invalid');
        }

        if (valid) {
            var newSite = {
                name: siteName,
                url: siteURL,
                newName: ''
            };
            bookMark.push(newSite);
            localStorage.setItem('bookMark', JSON.stringify(bookMark));
            displaySites(bookMark);
            siteNameInput.value = '';
            siteURLInput.value = '';
        } else {
            lightBoxContainer.classList.remove('d-none');
        }
    });

    closingIcon.addEventListener('click', function () {
        lightBoxContainer.classList.add('d-none');
    });

    dataContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            var index = e.target.getAttribute('data-index');
            bookMark.splice(index, 1);
            localStorage.setItem('bookMark', JSON.stringify(bookMark));
            displaySites(bookMark);
        }
    });
});

function searchSite(data) {
    var newBookMark = [];
    var originalName = data.toLowerCase();

    for (var i = 0; i < bookMark.length; i++) {
        var siteName = bookMark[i].name.toLowerCase();

        if (siteName.includes(originalName)) {
            var regex = new RegExp(`(${originalName})`, 'gi');
            bookMark[i].newName = bookMark[i].name.replaceAll(regex, `<span class="text-danger fw-bold">${data}</span>`);
            newBookMark.push(bookMark[i]);
        }
    }

    displaySites(newBookMark);
}

function displaySites(sites) {
    var container = document.querySelector('#dataa');
    container.innerHTML = '';

    sites.forEach(function (site, index) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${site.newName || site.name}</td>
            <td><a href="${site.url}" target="_blank" class="btn btn-primary">Visit</a></td>
            <td><button class="btn btn-danger delete-btn" data-index="${index}">Delete</button></td>
        `;
        container.appendChild(row);
    });
}
