import { Ref } from "vue";

const useTableResizeColumns = (el: Ref) => {
  let pageX: any, curCol: any, nxtCol: any, curColWidth: any, nxtColWidth: any;
  const createDiv = (height = tableHeight) => {
    const div = document.createElement("div");
    div.style.top = "0";
    div.style.right = "0";
    div.style.width = "5px";
    div.style.position = "absolute";
    div.style.cursor = "col-resize";
    div.style.userSelect = "none";
    div.style.height = height + "px";
    div.style.zIndex = "2";
    return div;
  };

  const setListeners = (div: HTMLElement) => {
    div.addEventListener("mousedown", (e: any) => {
      console.log(e.target.parentElement, "here");
      curCol = e.target.parentElement;
      nxtCol = curCol.nextElementSibling;
      pageX = e.pageX;

      const padding = paddingDiff(curCol);

      curColWidth = curCol.offsetWidth - padding;

      if (nxtCol) nxtColWidth = nxtCol.offsetWidth - padding;
    });
  };

  const paddingDiff = (col: any) => {
    if (getStyleVal(col, "box-sizing") === "border-box") return 0;

    const padLeft = getStyleVal(col, "padding-left");
    const padRight = getStyleVal(col, "padding-right");

    return parseInt(padLeft) + parseInt(padRight);
  };

  const getStyleVal = (elm: any, css: any) =>
    window.getComputedStyle(elm, null).getPropertyValue(css);

  const table = el.value;

  const row = table.querySelector(".estimate-table--row");
  const cols = row ? row.children : null;

  if (!cols) return;

  const tableHeight = table.offsetHeight;

  for (let i = 0; i < cols.length; i++) {
    const div = createDiv();
    cols[i].appendChild(div);
    cols[i].style.position = "relative";
    setListeners(div);

    div.addEventListener("mouseover", (e: any) => {
      e.target.style.borderRight = "2px solid #0000ff";
    });

    div.addEventListener("mouseout", (e: any) => {
      e.target.style.borderRight = "";
    });

    div.addEventListener("mousemove", function (e) {
      if (curCol) {
        const diffX = e.pageX - pageX;

        if (nxtCol) nxtCol.style.width = nxtColWidth - diffX + "px";

        curCol.style.width = curColWidth + diffX + "px";
      }
    });

    div.addEventListener("mouseup", function (e) {
      curCol = undefined;
      nxtCol = undefined;
      pageX = undefined;
      nxtColWidth = undefined;
      curColWidth = undefined;
    });
  }
};

export default useTableResizeColumns;
