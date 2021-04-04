import random
import string
import traceback
from browser import window, bind, document

print("loaded.")


@bind("#generate-case", "click")
def clicked(e):
    window.generate_dialog.open()


@bind("#start-generate", "click")
def start(e):
    try:
        window.loader_dialog.open()
        for i in range(int(document.getElementById("num-cases").value)):
            window.linearProgress.progress = i/int(document.getElementById("num-cases").value)
            try:
                exec(document.getElementById("test_case_generator").value, {}, locals())
            except Exception:
                window.jQuery("#comment-error").html(
                    "テストケース生成コードの実行中にエラーが発生しました。プログラムを確認してください。確認しても治らない場合はお手数ですが、バグ報告を行ってください。")
                window.jQuery("#genbun").text(traceback.format_exc())
                window.generate_error_dialog.open()
            else:
                tmp = []
                try:
                    for j in window.hensuu:
                        tmp.append(eval(j[0]))
                except NameError:
                    window.jQuery("#comment-error").html("変数の定義が間違っている可能性があります。確認してください。<br>"
                                                         "<span class='text-info'>テストケース生成時に定義されていない変数{}が存在します。</span>".
                                                         format(str(e).split("'")[1]))
                    window.jQuery("#genbun").text(traceback.format_exc())
                    window.generate_error_dialog.open()
                except Exception:
                    window.jQuery("#comment-error").html("処理できないエラーが発生しました。お手数ですが、バグ報告を行ってください。")
                    window.jQuery("#genbun").text(traceback.format_exc())
                    window.generate_error_dialog.open()
                else:
                    ok_list = []
                    global_list = {}
                    for j, k in enumerate(window.hensuu):
                        global_list[k[0]] = tmp[j]
                    global_ = {}
                    s = "A" + ''.join(random.choices(string.ascii_letters + string.digits, k=64))
                    try:
                        for j in document.getElementById("answer").value.splitlines():
                            if j.find("print(") != -1:
                                exec(j.replace("print(", s + "=("), global_)
                            else:
                                exec(j, global_)
                            for k in global_list:
                                if k in global_ and k not in ok_list:
                                    ok_list.append(k)
                                    global_[k] = global_list[k]
                    except Exception:
                        window.jQuery("#comment-error").html(
                            "テストケース生成コードの実行中にエラーが発生しました。プログラムを確認してください。確認しても治らない場合はお手数ですが、バグ報告を行ってください。")
                        window.jQuery("#genbun").text(traceback.format_exc())
                        window.generate_error_dialog.open()
                    else:
                        tmp.append(str(global_[s]))
                        tmp.append(False)

                        html = '<tr class="mdc-data-table__row" id="random_case-' + str(len(window.random_case)) + '">'
                        for j in tmp[:-1]:
                            html += '<th class="mdc-data-table__cell">' + str(j) + '</th>'
                        html += '<td class="mdc-data-table__cell"><div class="mdc-touch-target-wrapper"><div ' \
                                'class="mdc-checkbox ' \
                                'mdc-checkbox--touch"><input class="mdc-checkbox__native-control case-list-checkbox" ' \
                                'type="checkbox"/><div class="mdc-checkbox__background"><svg ' \
                                'class="mdc-checkbox__checkmark" ' \
                                'viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" d="M1.73,12.91 8.1,' \
                                '19.28 22.79,' \
                                '4.59" fill="none"/></svg><div class="mdc-checkbox__mixedmark"></div></div><div ' \
                                'class="mdc-checkbox__ripple"></div></div></div></td><td ' \
                                'class="mdc-data-table__cell"><button ' \
                                'class="mdc-button mdc-button--raised w-100 random-case-change-btn"><span ' \
                                'class="mdc-button__label">変更</span></button></td><td ' \
                                'class="mdc-data-table__cell"><button ' \
                                'class="mdc-button mdc-button--outlined w-100 random-case-remove-btn"><span ' \
                                'class="mdc-button__ripple"></span><span ' \
                                'class="mdc-button__label">削除</span></button></td> '
                        window.jQuery("#random_case-list").append(html)
                        window.random_case.append(tmp)
    except Exception:
        window.jQuery("#comment-error").html("処理できないエラーが発生しました。お手数ですが、バグ報告を行ってください。")
        window.jQuery("#genbun").text(traceback.format_exc())
        window.generate_error_dialog.open()
    finally:
        print("exited.")
        window.loader_dialog.close()
