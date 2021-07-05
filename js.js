$.fileDialog=(function(){let _clear=function(){const a=$("#"+_FILE_ID);a.off("change");if(a.length){a.remove()}};let _FILE_ID="jqueryFileDialogPlugin",_open=function(b){if(!b){throw"argument is invalid"}_clear();$("<input>").prop({type:"file",id:_FILE_ID,accept:b.accept}).css({display:"none"}).appendTo($("body"));const a=$("#"+_FILE_ID);a.trigger("click");a.on("change",function(){if(b.onChange){b.onChange(a.prop("files"))}_clear()})};return{open:_open,clear:_clear}}());

$(function () {
    const welcome = new mdc.dialog.MDCDialog(document.querySelector('.welcome'));
    const license = new mdc.dialog.MDCDialog(document.querySelector('.license'));
    const changetabledata_dialog = new mdc.dialog.MDCDialog(document.querySelector(".change-table-data"));
    const case_dialog = new mdc.dialog.MDCDialog(document.querySelector(".case"));
    const menu = new mdc.menu.MDCMenu(document.querySelector('.mdc-menu'));
    const error_dialog = new mdc.dialog.MDCDialog(document.querySelector("#error-dialog"));
    const success_dialog = new mdc.dialog.MDCDialog(document.querySelector("#success"));
    window.generate_dialog = new window.mdc.dialog.MDCDialog(document.querySelector("#generate-dialog"));
    window.generate_error_dialog = new window.mdc.dialog.MDCDialog(document.querySelector("#error_generate"));
    window.loader_dialog = new window.mdc.dialog.MDCDialog(document.querySelector("#loader"));
    window.linearProgress = new window.mdc.linearProgress.MDCLinearProgress(document.querySelector('.mdc-linear-progress'));
    const com_mde = new SimpleMDE({element: $("#com")[0], autosave: {enabled: true}, spellChecker: false});
    const problem_mde = new SimpleMDE({element: $("#problem")[0], autosave: {enabled: true}, spellChecker: false});
    const answer_editor = ace.edit("answer");
    answer_editor.$blockScrolling = Infinity;
    answer_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
    answer_editor.setFontSize(20);
    answer_editor.setTheme("ace/theme/crimson_editor");
    answer_editor.getSession().setMode("ace/mode/python");
    answer_editor.setValue("A=B=1\nprint(A**B)");
    const test_case_editor = ace.edit("test_case_generator");
    test_case_editor.$blockScrolling = Infinity;
    test_case_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
    test_case_editor.setFontSize(20);
    test_case_editor.setTheme("ace/theme/crimson_editor");
    test_case_editor.getSession().setMode("ace/mode/python");
    test_case_editor.setValue("from random import randint\nA=randint(1,1000)\nB=randint(1,1000)");
    problem_mde.value("A,Bが与えられる。\nAのB乗を求めよ。")
    com_mde.value("AのB乗は`A**B`です。\nそれをprintするだけ!")
    loader_dialog.scrimClickAction = "";
    loader_dialog.escapeKeyAction = "";
    menu.listen("MDCMenu:selected", function (e) {
        $("#hname").text(($("#h" + e.detail.index + " > .mdc-list-item__text").text()));
    });
    window.hensuu = [
        ["A", "int"],
        ["B", "int"]
    ];

    window.random_case = [
        [2, 3, "8", false],
        [3, 2, "9", false],
        [1, 1, "1", true]
    ];

    function update_case_row() {
        let random_case_row = $("#random-case-list-row");
        random_case_row.empty();
        $("#random_case-list").empty();
        window.random_case = [];
        hensuu.forEach(function (value) {
            random_case_row.append('<th class="mdc-data-table__header-cell">変数' + value[0] + '</th>');
        });
        random_case_row.append('<th class="mdc-data-table__header-cell">対応する文字列</th>');
        random_case_row.append('<th class="mdc-data-table__header-cell">コーナーケース</th>');
        random_case_row.append('<th class="mdc-data-table__header-cell"></th>');
        random_case_row.append('<th class="mdc-data-table__header-cell"></th>');
    }

    document.querySelectorAll('.mdc-text-field').forEach(function (value) {
        new mdc.textField.MDCTextField(value);
    })
    document.querySelectorAll('.mdc-button').forEach(function (value) {
        new mdc.ripple.MDCRipple(value);
    })
    document.querySelectorAll('.mdc-checkbox').forEach(function (value) {
        new mdc.checkbox.MDCCheckbox(value);
    })
    welcome.open();
    changetabledata_dialog.escapeKeyAction = "";
    changetabledata_dialog.scrimClickAction = "";
    case_dialog.escapeKeyAction = "";
    case_dialog.scrimClickAction = "";

    $("#show-license").on("click", function () {
        license.open();
    });

    $("#sentaku-kata").on("click", function () {
        menu.open = true;
    })

    $("#save").on("click", function () {
        const tmp = $("#name").val();
        if (tmp !== "") {
            const hid = $("#hid").text()
            const hname = $("#hname").text();
            hensuu[hid][0] = tmp;
            hensuu[hid][1] = hname;
            changetabledata_dialog.close();
            $("#hensuu-" + hid + " > .name").text(tmp);
            $("#hensuu-" + hid + " > .hname").text(hname);
            update_case_row();
        } else {
            $("#error-hensuu-name").removeClass("d-none");
        }
    })

    $("#add_hensuu").on("click", function () {
        $("#change-table-data-title").text("変数の追加");
        $("#error-hensuu-name").addClass("d-none");
        $("#name").val("");
        $("#hname").text("int");
        $("#hid").text(hensuu.length);
        $("#hensuu-list").append('<tr class="mdc-data-table__row" id="hensuu-' + hensuu.length + '"><th class="mdc-data-table__cell name"></th><td class="mdc-data-table__cell hname"></td><td class="mdc-data-table__cell"><button class="mdc-button mdc-button--raised w-100 change-btn"><span class="mdc-button__label">変更</span></button></td><td class="mdc-data-table__cell"><button class="mdc-button mdc-button--outlined w-100 remove-btn"><span class="mdc-button__ripple"></span><span class="mdc-button__label">削除</span></button></td></tr>')
        document.querySelectorAll('#hensuu-list .mdc-button').forEach(function (value) {
            new mdc.ripple.MDCRipple(value);
        })
        hensuu.push(["", ""]);
        changetabledata_dialog.open();
    })

    $(document).on("click", ".change-btn", function () {
        $("#change-table-data-title").text("変数の変更");
        const index = $(this).parent().parent().attr('id').split("-")[1];
        $("#error-hensuu-name").addClass("d-none");
        $("#name").val(hensuu[index][0]);
        $("#hname").text(hensuu[index][1]);
        $("#hid").text(index);
        changetabledata_dialog.open();
    }).on("click", ".remove-btn", function () {
        let index = $(this).parent().parent().attr('id').split("-")[1];
        hensuu.splice(index, 1);
        while ($("#hensuu-" + index).length) {
            $("#hensuu-" + index).attr("id", "#hensuu-" + (index - 1));
            index++;
        }
        $(this).parent().parent().remove();
        update_case_row();
    }).on("click", ".random-case-remove-btn", function () {
        let index = $(this).parent().parent().attr('id').split("-")[1];
        random_case.splice(index, 1);
        while ($("#random_case-" + index).length) {
            $("#random_case-" + index).attr("id", "random_case-" + (index - 1));
            index++;
        }
        $(this).parent().parent().remove();
    }).on("click", ".random-case-change-btn", function () {
        $("#random-case-dialog-title").text("ケースの変更");
        const index = $(this).parent().parent().attr('id').split("-")[1];
        $("#random-case-error").addClass("d-none");
        const case_content = $(".case_content");
        case_content.empty();
        hensuu.forEach(function (value) {
            $(".case_content").append('<label class="mdc-text-field mdc-text-field--outlined w-100 mt-3"><span class="mdc-notched-outline"><span class="mdc-notched-outline__leading"></span> <span class="mdc-notched-outline__notch"><span class="mdc-floating-label">変数' + value[0] + '</span></span> <span class="mdc-notched-outline__trailing"></span></span><input class="mdc-text-field__input text" required type="text"></label><div class="mdc-text-field-helper-line"><div class="mdc-text-field-helper-text">変数' + value[0] + 'のケースを入れてください。型は' + value[1] + 'です。</div></div>');
        });
        case_content.append('<label class="mdc-text-field mdc-text-field--outlined w-100 mt-3"><span class="mdc-notched-outline"><span class="mdc-notched-outline__leading"></span> <span class="mdc-notched-outline__notch"><span class="mdc-floating-label">対応する文字列</span></span> <span class="mdc-notched-outline__trailing"></span></span><input class="mdc-text-field__input text" required type="text"></label><div class="mdc-text-field-helper-line"><div class="mdc-text-field-helper-text">このケースに対応する文字列</div></div>');
        $(".text").each(function (i, element) {
            $(element).val(random_case[index][i]);
        });
        document.querySelectorAll('.case .mdc-text-field').forEach(function (value) {
            new mdc.textField.MDCTextField(value);
        })
        $("#case_hid").text(index);
        case_dialog.open();
    }).on("change", ".case-list-checkbox", function () {
        let index = $(this).parent().parent().parent().parent().attr('id').split("-")[1];
        random_case[index].pop();
        random_case[index].push($(this).prop('checked'));
    });

    $("#add_random_case").on("click", function () {
        $("#random-case-dialog-title").text("ケースの追加");
        $("#random-case-error").addClass("d-none");
        const case_content = $(".case_content");
        case_content.empty();
        hensuu.forEach(function (value) {
            $(".case_content").append('<label class="mdc-text-field mdc-text-field--outlined w-100 mt-3"><span class="mdc-notched-outline"><span class="mdc-notched-outline__leading"></span> <span class="mdc-notched-outline__notch"><span class="mdc-floating-label">変数' + value[0] + '</span></span> <span class="mdc-notched-outline__trailing"></span></span><input class="mdc-text-field__input text" required type="text"></label><div class="mdc-text-field-helper-line"><div class="mdc-text-field-helper-text">変数' + value[0] + 'のケースを入れてください。型は' + value[1] + 'です。</div></div>');
        });
        case_content.append('<label class="mdc-text-field mdc-text-field--outlined w-100 mt-3"><span class="mdc-notched-outline"><span class="mdc-notched-outline__leading"></span> <span class="mdc-notched-outline__notch"><span class="mdc-floating-label">対応する文字列</span></span> <span class="mdc-notched-outline__trailing"></span></span><input class="mdc-text-field__input text" required type="text"></label><div class="mdc-text-field-helper-line"><div class="mdc-text-field-helper-text">このケースに対応する文字列</div></div>');
        document.querySelectorAll('.case .mdc-text-field').forEach(function (value) {
            new mdc.textField.MDCTextField(value);
        })
        $("#case_hid").text(random_case.length);
        case_dialog.open();
    })

    $("#random-case-save").on("click", function () {
        const id = $("#case_hid").text();
        let i = 0;
        const text = $(".text");
        text.each(function (index, element) {
            if ($(element).val() === "") i++;
        })
        if (i !== 0) {
            $("#random-case-error").removeClass("d-none");
        } else {
            try {
                const tmp = [];
                text.each(function (index, element) {
                    if (hensuu[index] !== undefined) {
                        if (hensuu[index][1] === "int" || hensuu[index][1] === "float") {
                            if (isNaN(Number($(element).val()))) {
                                $("#random-case-error").removeClass("d-none");
                                throw new TypeError("変換エラー！:int or float");
                            }
                            tmp.push(Number($(element).val()));
                        } else if (hensuu[index][1] === "list" || hensuu[index][1] === "dict") {
                            try {
                                tmp.push(JSON.parse($(element).val()));
                            } catch (e) {
                                $("#random-case-error").removeClass("d-none");
                                throw new TypeError("変換エラー！: list or dict");
                            }
                        }
                    } else {
                        tmp.push($(element).val());
                    }
                });
                const jtmp = $("#random_case-" + id);
                if (jtmp.length) {
                    jtmp.remove();
                }
                let html_msg = '<tr class="mdc-data-table__row" id="random_case-' + id + '">';
                tmp.forEach(function (value) {
                    html_msg += '<th class="mdc-data-table__cell">' + value + '</th>';
                });
                html_msg += '<td class="mdc-data-table__cell"><div class="mdc-touch-target-wrapper"><div class="mdc-checkbox mdc-checkbox--touch"><input class="mdc-checkbox__native-control case-list-checkbox" type="checkbox"><div class="mdc-checkbox__background"><svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" d="M1.73,12.91 8.1,19.28 22.79,4.59" fill="none" /></svg><div class="mdc-checkbox__mixedmark"></div></div><div class="mdc-checkbox__ripple"></div></div></div>' +
                    '<td class="mdc-data-table__cell"><button class="mdc-button mdc-button--raised w-100 random-case-change-btn"><span class="mdc-button__label">変更</span></button><td class="mdc-data-table__cell"><button class="mdc-button mdc-button--outlined w-100 random-case-remove-btn"><span class="mdc-button__ripple"></span> <span class="mdc-button__label">削除</span></button>';
                tmp.push(false);
                if (random_case.length > id) {
                    random_case.splice(id, 1, tmp);
                } else {
                    random_case.push(tmp);
                }
                console.log(random_case)
                if (id - 1 === -1) {
                    $(html_msg).prependTo("#random_case-list");
                }
                $(html_msg).insertAfter("#random_case-" + (id - 1));
                document.querySelectorAll('#random_case-' + id + " .mdc-button").forEach(function (value) {
                    new mdc.ripple.MDCRipple(value);
                })
                document.querySelectorAll('#random_case-' + id + ' .mdc-checkbox').forEach(function (value) {
                    new mdc.checkbox.MDCCheckbox(value);
                })
                case_dialog.close();
            } catch (e) {
                console.warn("エラーを検知", e);
            }
        }
    });

    $("#export-json").on("click", function () {
        const title = $("#title").val();
        const point = $("#point").val();
        const tags = $("#tags").val();
        const userid = $("#userid").val();
        const restrict = $("#restrict").val();
        let problem = problem_mde.value();
        const answer = answer_editor.getValue();
        const com = com_mde.value();
        const test_case_generator = test_case_editor.getValue();
        const error = [];
        if (title === "") {
            error.push("タイトル");
        }
        if (point === "") {
            error.push("得点");
        }
        if (userid === "") {
            error.push("アカウントのID");
        }
        if (restrict === "") {
            error.push("満たすべき制約");
        }
        if (problem.replace(/\r?\n/g, "") === "") {
            error.push("問題文");
        }
        if (answer.replace(/\r?\n/g, "") === "") {
            error.push("想定解");
        }
        if (com.replace(/\r?\n/g, "") === "") {
            error.push("解説文");
        }
        if (test_case_generator.replace(/\r?\n/g, "") === "") {
            error.push("テストケース生成コード");
        }
        if (error.length !== 0) {
            $("#error-msg").html(error.join("<br>"));
            error_dialog.open();
        } else {
            problem += "\n\n### 制約\n\n```python\n" + restrict + "\n```\n\n### 必要な変数\n\n" + hensuu.map(function (n) {
                return "- " + n[0]
            }).join("\n") + "\n\n### 入力例\n\n```python\n"
            hensuu.forEach(function (value, index) {
                problem += value[0] + " = " + random_case[0][index] + "\n"
            })
            problem += "```\n\n### 出力例\n\n```python\n" + random_case[0].slice(-2)[0] + "\n```"
            const j = {
                "title": title,
                "rating": Number(point),
                "tags": tags,
                "user_id": userid,
                "restrict": restrict,
                "question": problem,
                "test_case": {
                    "variables": {},
                    "cases": [],
                    "corner_cases": []
                },
                "expected_answer": answer,
                "test_case_generator": test_case_generator,
                "comment": com
            }
            hensuu.forEach(function (value) {
                j.test_case.variables[value[0]] = value[1];
            });
            random_case.forEach(function (value) {
                var tmp = {};
                hensuu.forEach(function (i, index, array) {
                    tmp[i[0]] = value[index];
                });
                if (value.slice(-1)[0]) {
                    j.test_case.corner_cases.push({
                        "inputs": tmp,
                        "output": value.slice(-2)[0]
                    })
                } else {
                    j.test_case.cases.push({
                        "inputs": tmp,
                        "output": value.slice(-2)[0]
                    })
                }
            })

            console.log(j);
            $("#code").text(JSON.stringify(j, null, "  "));
            success_dialog.open();
        }
    });

    $("#save-json").on("click", function () {
        $('<a>', {
            href: 'data:text/plain,' + encodeURIComponent($("#code").text()),
            download: $("#title").val() + ".json"
        })[0].click();
    });

    $("#import-json").on("click", function () {
        $.fileDialog.open({
            accept: '.json',
            onChange: function(files) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    const data = JSON.parse(reader.result);
                    $("#title").val(data.title);
                    $("#point").val(data.rating);
                    $("#tags").val(data.tags);
                    $("#userid").val(data.user_id);
                    $("#restrict").val(data.restrict);
                    problem_mde.value(data.question);
                    let index = 0;
                    while ($("#hensuu-" + index).length) {
                        $("#hensuu-" + index).remove();
                        index++;
                    }
                    window.hensuu = [];
                    Object.keys(data.test_case.variables).forEach(function (key){
                        $("#hensuu-list").append('<tr class="mdc-data-table__row" id="hensuu-' + hensuu.length + '"><th class="mdc-data-table__cell name">'+key+'</th><td class="mdc-data-table__cell hname">'+data.test_case.variables[key]+'</td><td class="mdc-data-table__cell"><button class="mdc-button mdc-button--raised w-100 change-btn"><span class="mdc-button__label">変更</span></button></td><td class="mdc-data-table__cell"><button class="mdc-button mdc-button--outlined w-100 remove-btn"><span class="mdc-button__ripple"></span><span class="mdc-button__label">削除</span></button></td></tr>')
                        document.querySelectorAll('#hensuu-list .mdc-button').forEach(function (value) {
                            new mdc.ripple.MDCRipple(value);
                        })
                        hensuu.push([key,data.test_case.variables[key]]);
                    });

                    update_case_row();
                };

                reader.readAsText(file);
            }
        });
    })

    brython(1);
});
