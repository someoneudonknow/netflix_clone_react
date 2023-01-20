const removeModalInfo = () => {
    window.sessionStorage.removeItem("filmId");
    window.sessionStorage.removeItem("isModalOpen");
    window.sessionStorage.removeItem("scrollTop");
}

export default removeModalInfo;