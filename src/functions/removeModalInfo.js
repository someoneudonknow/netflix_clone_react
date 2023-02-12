const removeModalInfo = () => {
    window.sessionStorage.removeItem("filmId");
    window.sessionStorage.removeItem("isModalOpen");
    window.sessionStorage.removeItem("scrollTop");
    window.sessionStorage.removeItem("type");
}

export default removeModalInfo;