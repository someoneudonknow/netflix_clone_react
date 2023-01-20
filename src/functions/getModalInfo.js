const getModalInfo = () => { 
    const isModalOpen = JSON.parse(window.sessionStorage.getItem("isModalOpen"));
    const id = JSON.parse(window.sessionStorage.getItem("filmId"));
    const scrollTop = JSON.parse(window.sessionStorage.getItem("scrollTop"));

    return {
        isModalOpen,
        id,
        scrollTop
    }
}

export default getModalInfo;