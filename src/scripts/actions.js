export const eventClickModal = (eventDetail, modalName) => {
  const modal = document.querySelector(modalName);
  modal.title = eventDetail.event.title;
  modal.eventId = eventDetail.event.id;
};

export const eventDropModal = (info, modalName) => {
  const modal = document.querySelector(modalName);
  modal.info = info;
  modal.open = true;
};
