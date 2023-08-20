import Page from "./PageModule.js";

window.Context = {
    AddContextMenu: (element) => AddContext(element),
};

var i = $("#menu")[0].style;

var PageBody = document.getElementsByClassName("page-body")[0];

var LastElement;

PageBody.childNodes.forEach((element) => {
    if (element.className == "section sortable-list") {
        element.childNodes.forEach((wd) => {
            AddContext(wd);
        });
    }
});

document.addEventListener(
    "click",
    function (e) {
        if (i.opacity === "0") return;

        i.opacity = "0";
        setTimeout(function () {
            i.visibility = "hidden";
        }, 60);

        console.log("Last: ");
        console.log(LastElement);

        if (
            LastElement.tagName !== "DIV" ||
            !LastElement.id.startsWith("widget-")
        ) {
            return;
        }

        console.log("Target: ");
        console.log(e.target);

        try {
            if (e.target.tagName === "DIV")
                e.target = e.target.firstElementChild;
        } catch {}

        switch (e.target.id) {
            case "ContextLinkDelete":
                {
                    console.log("DELETE LINK");
                    LastElement.remove();
                    delete Page.PageData.sections[
                        $(".section")[0].id.split("-")[1]
                    ].widgets[LastElement.id.split("-")[1]];
                    Page.Save();
                }
                break;
            case "ContextLinkOpenTab":
                {
                    window.open(LastElement.firstChild.href);
                }
                break;
            case "ContextLinkCopy":
                {
                    var text = LastElement.firstChild.href;

                    navigator.clipboard.writeText(text).then(
                        () => {
                            /* success */
                        },
                        () => {
                            /* failure */
                        }
                    );
                }
                break;
        }
    },
    false
);

function AddContext(element) {
    element.addEventListener(
        "contextmenu",
        function (e) {
            LastElement = e.target.parentElement.parentElement;
            if (LastElement.tagName === "A")
                LastElement =
                    e.target.parentElement.parentElement.parentElement;
            var posX = e.clientX;
            var posY = e.clientY;
            menu(posX, posY);
            e.preventDefault();
        },
        false
    );
}

function menu(x, y) {
    i.top = y + "px";
    i.left = x + "px";
    i.visibility = "visible";
    i.opacity = "1";
}
