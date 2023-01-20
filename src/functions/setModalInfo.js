const setModalInfo = (info) => {
    window.sessionStorage.setItem("isModalOpen", JSON.stringify(info.isModalOpen));
    window.sessionStorage.setItem("filmId", info.id.toString());
    window.sessionStorage.setItem(
      "scrollTop",
      JSON.stringify(
        document.documentElement.scrollTop || document.body.scrollTop
      )
    );
}

export default setModalInfo;