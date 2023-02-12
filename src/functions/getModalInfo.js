const getModalInfo = () => { 
    const isModalOpen = JSON.parse(window.sessionStorage.getItem("isModalOpen"));
    const id = JSON.parse(window.sessionStorage.getItem("filmId"));
    const scrollTop = JSON.parse(window.sessionStorage.getItem("scrollTop"));
    const type = window.sessionStorage.getItem("type");
    
    return {
        isModalOpen,
        id,
        scrollTop,
        type
    }
}

export default getModalInfo;