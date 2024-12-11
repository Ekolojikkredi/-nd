// Sayfa Geçişi (Yeni Sayfa Açma)
function openPage(pageName) {
    // Tüm sayfa container'larını gizle
    let pages = document.querySelectorAll('.form-container');
    pages.forEach(function(page) {
        page.classList.remove('active-page');
        page.classList.add('hidden-page');
    });

    // Seçilen sayfayı aktif hale getir
    let selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active-page');
        selectedPage.classList.remove('hidden-page');
    }
}

// Okul Kaydını Ekle
document.getElementById('okulKayitForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('schoolName').value;
    let password = document.getElementById('schoolPassword').value;
    let province = document.getElementById('schoolProvince').value;
    let district = document.getElementById('schoolDistrict').value;

    let schoolData = {
        name,
        password,
        province,
        district,
    };

    localStorage.setItem('school', JSON.stringify(schoolData));

    alert('Okul başarıyla kaydedildi!');
    openPage('ogrenciKayitForm'); // Okul kaydından sonra Öğrenci kaydına geçiş
});

// Öğrenci Kaydını Ekle
document.getElementById('ogrenciKayitForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('studentName').value;
    let surname = document.getElementById('studentSurname').value;
    let email = document.getElementById('studentEmail').value;
    let studentNumber = document.getElementById('studentNumber').value;
    let phone = document.getElementById('studentPhone').value;
    let studentClass = document.getElementById('studentClass').value;

    let studentData = {
        name,
        surname,
        email,
        studentNumber,
        phone,
        studentClass,
    };

    localStorage.setItem(studentNumber, JSON.stringify(studentData));

    alert('Öğrenci başarıyla kaydedildi!');
    openPage('veriGirisForm'); // Öğrenci kaydından sonra Veri girişi sayfasına geçiş
});

// Veri Girişi
document.getElementById('veriGirisForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let studentNumberEntry = document.getElementById('studentNumberEntry').value;
    let wasteType = document.getElementById('wasteType').value;
    let wasteWeight = document.getElementById('wasteWeight').value;
    let enteredBy = document.getElementById('enteredBy').value;

    let wasteData = {
        wasteType,
        wasteWeight,
        enteredBy,
    };

    let studentData = JSON.parse(localStorage.getItem(studentNumberEntry));
    if (!studentData) {
        alert('Öğrenci bulunamadı!');
        return;
    }

    if (!studentData.wasteData) {
        studentData.wasteData = [];
    }

    studentData.wasteData.push(wasteData);

    localStorage.setItem(studentNumberEntry, JSON.stringify(studentData));

    alert('Veri başarıyla girildi!');
    openPage('veriGirisForm'); // Veri girişinden sonra veri girişi sayfasına geri dön
});

// Veri Görüntüleme
document.getElementById('viewDataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let studentNumber = document.getElementById('viewStudentNumber').value;
    let studentEmail = document.getElementById('viewStudentEmail').value;

    let studentData = JSON.parse(localStorage.getItem(studentNumber));

    if (!studentData || studentData.email !== studentEmail) {
        document.getElementById('viewResult').innerHTML = '<p>Öğrenci bulunamadı veya bilgiler hatalı!</p>';
        return;
    }

    let wasteData = studentData.wasteData ? studentData.wasteData : [];

    let resultHTML = `<h3>${studentData.name} ${studentData.surname} - ${studentData.studentClass}</h3><ul>`;
    wasteData.forEach(function(waste) {
        resultHTML += `<li>${waste.wasteType} - ${waste.wasteWeight}kg (Giren: ${waste.enteredBy})</li>`;
    });
    resultHTML += '</ul>';

    document.getElementById('viewResult').innerHTML = resultHTML;
});
