import { data } from './data.js';

const contentArea = document.getElementById('content-area');
const navLinks = document.querySelectorAll('nav ul li a'); // This selects all <a> within nav ul li

// Path to the generic education icon - used as a placeholder
// NOTE: Due to copyright restrictions, specific logos of institutions cannot be used or generated.
// This is a generic icon to provide a visual element.
const genericIconPath = '/education_icon.png';

// Function to render the Home section
function renderHome() {
    contentArea.innerHTML = `
        <h2 class="section-title">Bienvenido</h2>
        <p>Explora información valiosa sobre oportunidades educativas y universidades en República Dominicana, diseñadas especialmente para estudiantes de secundaria.</p>
        <p>Utiliza el menú de navegación para explorar los <strong>Cursos y Talleres</strong> disponibles, tanto virtuales como presenciales, que pueden ayudarte a desarrollar nuevas habilidades o profundizar en tus intereses. También puedes consultar nuestra sección de <strong>Universidades RD</strong> para conocer las principales instituciones del país y las carreras que ofrecen.</p>
        <p>La sección de <strong>Becas y Ofertas</strong> ofrece información sobre ayudas económicas y oportunidades relevantes, especialmente para estudiantes de bajos ingresos. Si necesitas ayuda o tienes alguna pregunta, visita la sección de <strong>Contacto</strong>.</p>
        <p>¡Esperamos que esta plataforma te sea de gran ayuda en tu camino educativo!</p>
    `;
}

// Function to render the Courses and Workshops section
function renderCourses() {
    let html = '<h2 class="section-title">Cursos y Talleres</h2>';
    if (data.courses.length === 0) {
        html += '<p>No hay cursos o talleres disponibles en este momento.</p>';
    } else {
        data.courses.forEach(course => {
            html += `
                <div class="course-item">
                    <img src="${genericIconPath}" alt="Icono educativo genérico" class="item-icon">
                    <div class="item-content">
                        <h3>${course.title}</h3>
                        <p><strong>Descripción:</strong> ${course.description}</p>
                        <p><strong>Tipo:</strong> ${course.type}</p>
                        <p><strong>Impartido por:</strong> ${course.provider}</p>
                        ${course.dates ? `<p><strong>Fechas/Horarios:</strong> ${course.dates}</p>` : ''}
                        ${course.link && course.link !== '#' ? `<p><a href="${course.link}" target="_blank">Más Información</a></p>` : ''}
                    </div>
                </div>
            `;
        });
    }
    contentArea.innerHTML = html;
}

// Helper function to render a list of universities
function renderUniversityList(universitiesArray, categoryTitle, targetElement) {
    let html = '';
    html += `<h3 class="category-title">${categoryTitle}</h3>`;
    if (universitiesArray.length === 0) {
        html += `<p>No se encontraron resultados en esta categoría.</p>`;
    } else {
        universitiesArray.forEach(university => {
            // Note: Adding specific, copyrighted logos is not feasible with current constraints.
            // A generic icon is used as a placeholder.
            html += `
                <div class="university-item">
                     <img src="${genericIconPath}" alt="Icono universitario genérico" class="item-icon">
                     <div class="item-content">
                        <h3>${university.name}</h3>
                        <p><strong>Ubicación:</strong> ${university.location}</p>
                        <p><strong>Sitio Web:</strong> ${university.website && university.website !== '#' ? `<a href="${university.website}" target="_blank">${university.website}</a></p>` : 'No disponible'}</p>
                        <p><strong>Materias/Carreras Destacadas:</strong></p>
                        <ul>
                            ${university.subjects.map(subject => `<li>${subject}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });
    }
    targetElement.innerHTML += html; // Append to the target element
}

// Function to render the Universities section with search
function renderUniversities() {
    contentArea.innerHTML = `
        <h2 class="section-title">Universidades e Institutos en República Dominicana</h2>
        <div class="search-container">
            <input type="text" id="university-search" placeholder="Buscar por nombre, ubicación o carrera...">
        </div>
        <div id="universities-list-container">
            <!-- University lists will be rendered here -->
        </div>
    `;

    const searchInput = document.getElementById('university-search');
    const listContainer = document.getElementById('universities-list-container');

    // Initial render of all universities
    renderFilteredUniversities('');

    // Add event listener for search input
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        renderFilteredUniversities(searchTerm);
    });
}

// Function to filter and render universities based on search term
function renderFilteredUniversities(searchTerm) {
    const listContainer = document.getElementById('universities-list-container');
    if (!listContainer) return; // Ensure container exists

    listContainer.innerHTML = ''; // Clear previous results

    const filterUniversity = (university) => {
        const searchMatch =
            university.name.toLowerCase().includes(searchTerm) ||
            university.location.toLowerCase().includes(searchTerm) ||
            university.subjects.some(subject => subject.toLowerCase().includes(searchTerm));
        return searchMatch;
    };

    const publicUniversities = data.universities.public.filter(filterUniversity);
    const privateUniversities = data.universities.private.filter(filterUniversity);

    renderUniversityList(publicUniversities, 'Instituciones Públicas', listContainer);
    renderUniversityList(privateUniversities, 'Instituciones Privadas', listContainer);

    // If no results in either category, display a message
    if (publicUniversities.length === 0 && privateUniversities.length === 0) {
        listContainer.innerHTML = `<h3 class="category-title">Resultados de la búsqueda</h3><p>No se encontraron resultados para "${searchTerm}".</p>`;
    }
}

// Function to render the Scholarships section
function renderScholarships() {
    let html = '<h2 class="section-title">Becas, Ofertas y Ayudas</h2>';
    html += '<p>Aquí encontrarás información sobre programas de becas y otras oportunidades relevantes, especialmente dirigidas a estudiantes de bajos ingresos o con necesidades específicas.</p>';

    if (data.scholarships.length === 0) {
        html += '<p>No hay becas u ofertas disponibles en este momento. Vuelve pronto para nuevas actualizaciones.</p>';
    } else {
        data.scholarships.forEach(item => {
            // Note: Adding specific, copyrighted logos is not feasible with current constraints.
            // A generic icon is used as a placeholder.
            html += `
                <div class="scholarship-item">
                    <img src="${genericIconPath}" alt="Icono de beca/oferta genérico" class="item-icon">
                    <div class="item-content">
                        <h3>${item.title}</h3>
                        <p><strong>Descripción:</strong> ${item.description}</p>
                        <p><strong>Impartido/Ofrecido por:</strong> ${item.provider}</p>
                        ${item.eligibility_summary ? `<p><strong>Criterios de Elegibilidad (Resumen):</strong> ${item.eligibility_summary}</p>` : ''}
                        ${item.deadline ? `<p><strong>Fecha Límite:</strong> ${item.deadline}</p>` : ''}
                        ${item.link && item.link !== '#' ? `<p><a href="${item.link}" target="_blank">Más Información / Aplicar</a></p>` : ''}
                    </div>
                </div>
            `;
        });
    }
    contentArea.innerHTML = html;
}

// Function to render the Contact section
function renderContact() {
    contentArea.innerHTML = `
        <h2 class="section-title">Contacto y Ayuda</h2>
        <p>Si necesitas ayuda con la plataforma, tienes sugerencias o deseas ponerte en contacto con el creador, por favor utiliza la siguiente información:</p>
        <div class="contact-info">
            <p><strong>Correo Electrónico:</strong> <a href="mailto:contacto.plataforma.rd@example.com">contacto.plataforma.rd@example.com</a></p> <!-- Use a placeholder email -->
            <p>Por favor, sé específico en tu mensaje para que podamos ayudarte de la mejor manera posible.</p>
        </div>
        <p>Agradecemos tu interés en esta plataforma y esperamos que te sea de gran utilidad.</p>
    `;
}

// Event listeners for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const section = event.target.dataset.section;

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to the clicked link
        link.classList.add('active');

        switch (section) {
            case 'home':
                renderHome();
                break;
            case 'courses':
                renderCourses();
                break;
            case 'universities':
                renderUniversities();
                break;
            case 'scholarships': // New case
                renderScholarships();
                break;
            case 'contact': // New case
                renderContact();
                break;
            default:
                renderHome(); // Default to home
        }
    });
});

// Initial load: Render the home page and set home link as active
renderHome();
document.querySelector('nav ul li a[data-section="home"]').classList.add('active');