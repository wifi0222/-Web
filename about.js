document.addEventListener('DOMContentLoaded', function() {
    const members = document.querySelectorAll('.member');
    const memberInfo = document.getElementById('member-info');

    members.forEach(member => {
        member.addEventListener('click', function() {
            const info = this.getAttribute('data-info');
            memberInfo.textContent = info;
        });
    });
});
