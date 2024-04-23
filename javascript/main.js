function checkIfMobile() {

    const maxWidthForMobile = 768;

    if (window.innerWidth < maxWidthForMobile) { // If the screen is smaller than 768px
        Swal.fire({
            title: "Be careful...",
            text: "You should use a laptop to visualize this website correctly!",
            icon: "info"
          });
    }
}

checkIfMobile();
