window.onload = function () {
    console.log("Page fully loaded.");

    // Main text to be typed (only once)
    const mainText = "Welcome to My Portfolio";

    // List of subtexts that will loop continuously
    const subTexts = [
        "Building Intelligent Systems with ROS, Gazebo, and SLAM",
        "Passionate about Autonomous Robotics and Computer Vision",
        "Creating Innovative Solutions with AI and Machine Learning",
        "Exploring the Future of Robotics with ROS2 and OpenCV",
        "Turning Ideas into Reality with Robotics Projects"
    ];

    let mainIndex = 0;
    let subIndex = 0;
    let currentSubTextIndex = 0;

    const mainElement = document.getElementById("typewriter-text");
    const subElement = document.getElementById("typewriter-subtext");

    // Check if elements exist
    if (!mainElement) {
        console.error("Element with ID 'typewriter-text' not found.");
        return;
    }
    if (!subElement) {
        console.error("Element with ID 'typewriter-subtext' not found.");
        return;
    }

    // Typing effect for the main text (only once)
    function typeMainText() {
        if (mainIndex < mainText.length) {
            mainElement.textContent += mainText.charAt(mainIndex);
            mainIndex++;
            setTimeout(typeMainText, 100);
        } else {
            setTimeout(() => typeSubText(subTexts[currentSubTextIndex]), 500);
        }
    }

    // Typing effect for the subtext (loops continuously)
    function typeSubText(subText) {
        subElement.style.opacity = 1;
        if (subIndex < subText.length) {
            subElement.textContent += subText.charAt(subIndex);
            subIndex++;
            setTimeout(() => typeSubText(subText), 50);
        } else {
            // Move to the next subtext after a delay
            setTimeout(() => {
                currentSubTextIndex = (currentSubTextIndex + 1) % subTexts.length;
                resetSubText();
                typeSubText(subTexts[currentSubTextIndex]);
            }, 2000); // Delay before typing the next subtext
        }
    }

    // Function to reset the subtext only
    function resetSubText() {
        subElement.textContent = "";
        subIndex = 0;
    }

    // Start typing the main text once, then loop subtexts
    console.log("Starting typing effect...");
    typeMainText();
};


// === EmailJS Form Submission ===
document.addEventListener("DOMContentLoaded", function () {
    console.log("EmailJS script loaded.");

    // Initialize EmailJS with your User ID
    emailjs.init('YOUR_USER_ID');

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const responseElement = document.getElementById('form-response');

            // Basic validation
            if (!name || !email || !message) {
                responseElement.textContent = 'Please fill in all fields.';
                responseElement.style.color = 'red';
                return;
            }

            try {
                // Send the form data using EmailJS
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    from_name: name,
                    from_email: email,
                    message: message,
                });

                responseElement.textContent = 'Message sent successfully!';
                responseElement.style.color = 'green';

                // Clear form fields
                form.reset();
            } catch (error) {
                console.error('Failed to send message:', error);
                responseElement.textContent = 'Failed to send message. Please try again.';
                responseElement.style.color = 'red';
            }
        });
    } else {
        console.error("Contact form not found.");
    }
});
