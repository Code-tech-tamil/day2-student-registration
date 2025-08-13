// profileUtils.js - Profile card creation and management utilities

/**
 * Generates a random gradient color for profile avatars
 * @returns {string} CSS linear-gradient string
 */
function generateRandomGradient() {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

/**
 * Generates initials from a full name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
function generateInitials(name) {
    if (!name || typeof name !== 'string') return '??';
    
    const words = name.trim().split(' ').filter(word => word.length > 0);
    if (words.length === 0) return '??';
    
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }
    
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/**
 * Validates profile data
 * @param {Object} profileData - Profile information
 * @returns {Object} Validated and sanitized profile data
 */
function validateProfileData(profileData) {
    if (!profileData || typeof profileData !== 'object') {
        throw new Error('Profile data must be an object');
    }
    
    const { name, role, id, avatar, email, department, skills } = profileData;
    
    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new Error('Name is required and must be a non-empty string');
    }
    
    if (!role || typeof role !== 'string' || role.trim().length === 0) {
        throw new Error('Role is required and must be a non-empty string');
    }
    
    return {
        name: name.trim(),
        role: role.trim(),
        id: id || Date.now(),
        avatar: avatar || null,
        email: email && typeof email === 'string' ? email.trim() : null,
        department: department && typeof department === 'string' ? department.trim() : null,
        skills: Array.isArray(skills) ? skills.filter(skill => typeof skill === 'string' && skill.trim().length > 0) : []
    };
}

/**
 * Creates a profile card element with advanced styling and animations
 * @param {Object} profileData - Profile information
 * @returns {HTMLElement} Complete profile card element
 */
function createProfileCard(profileData) {
    // Validate input data
    const validatedData = validateProfileData(profileData);
    const { name, role, id, avatar, email, department, skills } = validatedData;
    
    // Create main card element
    const profileCard = document.createElement('div');
    profileCard.className = 'profile-card';
    profileCard.setAttribute('data-profile-id', id);
    
    // Generate avatar content
    const avatarBackground = generateRandomGradient();
    const initials = generateInitials(name);
    const avatarContent = avatar ? 
        `<img src="${avatar}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` :
        `<span style="font-size: 2rem; font-weight: 600; color: white;">${initials}</span>`;
    
    // Generate skills badges if available
    const skillsBadges = skills.length > 0 ? 
        `<div class="profile-skills">
            ${skills.slice(0, 3).map(skill => 
                `<span class="skill-badge">${skill}</span>`
            ).join('')}
            ${skills.length > 3 ? `<span class="skill-more">+${skills.length - 3}</span>` : ''}
        </div>` : '';
    
    // Generate additional info if available
    const additionalInfo = email || department ? 
        `<div class="profile-info">
            ${email ? `<div class="profile-email"><i class="fas fa-envelope"></i> ${email}</div>` : ''}
            ${department ? `<div class="profile-department"><i class="fas fa-building"></i> ${department}</div>` : ''}
        </div>` : '';
    
    // Create card HTML structure
    profileCard.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar" style="background: ${avatarBackground};">
                ${avatarContent}
            </div>
            <div class="profile-status online" title="Online">
                <div class="status-dot"></div>
            </div>
        </div>
        <div class="profile-body">
            <h3 class="profile-name">${name}</h3>
            <div class="profile-role">${role}</div>
            ${additionalInfo}
            ${skillsBadges}
        </div>
        <div class="profile-actions">
            <button class="profile-action-btn contact-btn" onclick="contactProfile('${name}', '${email || 'N/A'}')" title="Contact">
                <i class="fas fa-envelope"></i>
            </button>
            <button class="profile-action-btn view-btn" onclick="viewProfile(${id})" title="View Details">
                <i class="fas fa-eye"></i>
            </button>
            <button class="remove-button" onclick="removeProfile(this)" title="Remove">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add dynamic CSS styles for this specific card
    addProfileCardStyles();
    
    // Add event listeners for enhanced interactivity
    addProfileCardEventListeners(profileCard, validatedData);
    
    return profileCard;
}

/**
 * Adds dynamic CSS styles for profile cards if not already added
 */
function addProfileCardStyles() {
    if (document.getElementById('profile-card-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'profile-card-styles';
    styles.textContent = `
        .profile-header {
            position: relative;
            margin-bottom: 1rem;
        }
        
        .profile-status {
            position: absolute;
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .status-dot {
            width: 10px;
            height: 10px;
            background: #4ade80;
            border-radius: 50%;
            box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.3);
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
        }
        
        .profile-body {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        
        .profile-info {
            margin: 0.75rem 0;
            font-size: 0.85rem;
            color: var(--text-secondary);
        }
        
        .profile-email, .profile-department {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin: 0.25rem 0;
        }
        
        .profile-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
            justify-content: center;
            margin-top: 0.75rem;
        }
        
        .skill-badge {
            background: rgba(79, 172, 254, 0.2);
            color: #4facfe;
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
            border: 1px solid rgba(79, 172, 254, 0.3);
        }
        
        .skill-more {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-secondary);
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
        }
        
        .profile-actions {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            align-items: center;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .profile-action-btn {
            background: var(--surface-glass);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-light);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .profile-action-btn:hover {
            background: var(--surface-glass-hover);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .contact-btn:hover {
            color: #4facfe;
            border-color: rgba(79, 172, 254, 0.5);
        }
        
        .view-btn:hover {
            color: #43e97b;
            border-color: rgba(67, 233, 123, 0.5);
        }
        
        .profile-card:hover .profile-avatar {
            transform: scale(1.05);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        .profile-avatar {
            transition: all 0.3s ease;
        }
    `;
    
    document.head.appendChild(styles);
}

/**
 * Adds event listeners to profile card for enhanced interactivity
 * @param {HTMLElement} card - Profile card element
 * @param {Object} profileData - Profile data
 */
function addProfileCardEventListeners(card, profileData) {
    // Add hover effects for the entire card
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.37)';
    });
    
    // Add click listener for card selection
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking on action buttons
        if (e.target.closest('.profile-actions')) return;
        
        // Remove active class from other cards
        document.querySelectorAll('.profile-card.selected').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Add active class to clicked card
        card.classList.add('selected');
        
        // Optional: Trigger custom event for card selection
        const selectEvent = new CustomEvent('profileSelected', {
            detail: profileData
        });
        document.dispatchEvent(selectEvent);
    });
}

/**
 * Creates a simplified profile card for quick display
 * @param {Object} profileData - Basic profile information
 * @returns {HTMLElement} Simplified profile card element
 */
function createSimpleProfileCard(profileData) {
    const { name, role } = validateProfileData(profileData);
    
    const card = document.createElement('div');
    card.className = 'profile-card simple';
    
    card.innerHTML = `
        <div class="profile-avatar" style="background: ${generateRandomGradient()};">
            ${generateInitials(name)}
        </div>
        <h3 class="profile-name">${name}</h3>
        <div class="profile-role">${role}</div>
        <button class="remove-button" onclick="removeProfile(this)">
            <i class="fas fa-times"></i> Remove
        </button>
    `;
    
    return card;
}

/**
 * Updates an existing profile card with new data
 * @param {HTMLElement} card - Existing profile card element
 * @param {Object} newData - Updated profile data
 * @returns {HTMLElement} Updated profile card element
 */
function updateProfileCard(card, newData) {
    if (!card || !card.classList.contains('profile-card')) {
        throw new Error('Invalid profile card element');
    }
    
    const validatedData = validateProfileData(newData);
    const { name, role, email, department, skills } = validatedData;
    
    // Update name
    const nameElement = card.querySelector('.profile-name');
    if (nameElement) nameElement.textContent = name;
    
    // Update role
    const roleElement = card.querySelector('.profile-role');
    if (roleElement) roleElement.textContent = role;
    
    // Update avatar initials if no image
    const avatarElement = card.querySelector('.profile-avatar span');
    if (avatarElement) avatarElement.textContent = generateInitials(name);
    
    // Add update animation
    card.style.transform = 'scale(1.05)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 200);
    
    return card;
}

/**
 * Bulk creates multiple profile cards
 * @param {Array} profilesArray - Array of profile data objects
 * @returns {Array} Array of profile card elements
 */
function createMultipleProfileCards(profilesArray) {
    if (!Array.isArray(profilesArray)) {
        throw new Error('Input must be an array of profile objects');
    }
    
    return profilesArray.map((profileData, index) => {
        try {
            return createProfileCard({
                ...profileData,
                id: profileData.id || Date.now() + index
            });
        } catch (error) {
            console.error(`Error creating profile card at index ${index}:`, error);
            return null;
        }
    }).filter(card => card !== null);
}

/**
 * Searches and filters profile cards based on criteria
 * @param {string} searchTerm - Search term to filter by
 * @param {string} searchField - Field to search in ('name', 'role', 'all')
 * @returns {Array} Filtered profile card elements
 */
function searchProfileCards(searchTerm, searchField = 'all') {
    const cards = document.querySelectorAll('.profile-card');
    const filteredCards = [];
    
    cards.forEach(card => {
        const name = card.querySelector('.profile-name')?.textContent.toLowerCase() || '';
        const role = card.querySelector('.profile-role')?.textContent.toLowerCase() || '';
        const term = searchTerm.toLowerCase();
        
        let matches = false;
        
        switch (searchField) {
            case 'name':
                matches = name.includes(term);
                break;
            case 'role':
                matches = role.includes(term);
                break;
            default:
                matches = name.includes(term) || role.includes(term);
        }
        
        if (matches) {
            filteredCards.push(card);
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    return filteredCards;
}

// Global functions for button onclick handlers
window.contactProfile = function(name, email) {
    if (email && email !== 'N/A') {
        window.open(`mailto:${email}?subject=Hello ${name}`);
    } else {
        alert(`Contact information not available for ${name}`);
    }
};

window.viewProfile = function(profileId) {
    const card = document.querySelector(`[data-profile-id="${profileId}"]`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.outline = '3px solid #4facfe';
        setTimeout(() => {
            card.style.outline = 'none';
        }, 2000);
    }
};

// Default export - main profile card creation function
export default createProfileCard;

// Named exports for additional utilities
export {
    createSimpleProfileCard,
    updateProfileCard,
    createMultipleProfileCards,
    searchProfileCards,
    generateRandomGradient,
    generateInitials,
    validateProfileData
};

// Profile management utilities object
export const ProfileUtils = {
    create: createProfileCard,
    createSimple: createSimpleProfileCard,
    update: updateProfileCard,
    createMultiple: createMultipleProfileCards,
    search: searchProfileCards,
    generateGradient: generateRandomGradient,
    generateInitials,
    validate: validateProfileData
};