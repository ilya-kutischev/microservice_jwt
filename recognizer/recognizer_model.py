import numpy as np # linear algebra
from cv2 import cv2  # считывание и обработка изображений
import keras


def letters_extract(image_file, out_size=28):
    if isinstance( image_file, str ):
        img = cv2.imread(image_file)
    else:
        img = image_file
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    img_erode = cv2.erode(thresh, np.ones((3, 3), np.uint8), iterations=2)  # 1it
    # Выделяем контуры
    contours, hierarchy = cv2.findContours(img_erode, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    # plt.imshow(img)S
    output = img.copy()
    letters = []
    for idx, contour in enumerate(contours):
        (x, y, w, h) = cv2.boundingRect(contour)
        if hierarchy[0][idx][3] == 0:
            cv2.rectangle(output, (x, y), (x + w, y + h), (70, 0, 0), 1)
            letter_crop = gray[y:y + h, x:x + w]
            # Выделяем квадрат
            size_max = max(w, h)
            letter_square = 255 * np.ones(shape=[size_max, size_max], dtype=np.uint8)
            if w > h:
                # Увеличиваем изображение сверху и снизу
                y_pos = size_max // 2 - h // 2
                letter_square[y_pos:y_pos + h, 0:w] = letter_crop
            elif w < h:
                # увеличиваем с боков
                # --||--
                x_pos = size_max // 2 - w // 2
                letter_square[0:h, x_pos:x_pos + w] = letter_crop
            else:
                letter_square = letter_crop
            # меняем размер матрицы на 28x28
            letters.append((x, w, cv2.resize(letter_square, (out_size, out_size), interpolation=cv2.INTER_AREA)))

    # Список по порядку слева на право
    letters.sort(key=lambda x: x[0], reverse=False)

    return letters


def emnist_predict_img(model, img, enum_labels):
    img = np.array(img) / 255
    img_arr = img.reshape(-1, 28, 28, 1)
    predict = model.predict(img_arr)
    result = np.argmax(predict)
    return enum_labels[result][1]


def photo_to_latex(im_path, model):
    to_latex = [[0, '!'], [1, '('], [2, ')'], [3, '+'], [4, ','], [5, '-'], [6, '0'],
                [7, '1'], [8, '2'], [9, '3'], [10, '4'], [11, '5'], [12, '6'], [13, '7'],
                [14, '8'], [15, '9'], [16, '='], [17, 'A'], [18, 'C'], [19, '\Delta'], [20, 'G'],
                [21, 'H'], [22, 'M'], [23, 'N'], [24, 'R'], [25, 'S'], [26, 'T'], [27, 'X'],
                [28, '['], [29, ']'], [30, '\alpha'], [31, '\char124'], [32, 'b'], [33, '\\beta'],
                [34, '\cos'], [35, 'd'], [36, '\div'], [37, 'e'], [38, '\exists'], [39, 'f'],
                [40, '\forall'], [41, '\\backslash'], [42, '\gamma'], [43, '\geq'], [44, '>'],
                [45, 'i'], [46, '\in'], [47, '\infty'], [48, '\int'], [49, 'j'], [50, 'k'],
                [51, 'l'], [52, '\lambda'], [53, '...'], [54, '\leq'], [55, '\lim'], [56, '\log'],
                [57, '<'], [58, '\mu'], [59, '\neq'], [60, 'o'], [61, 'p'], [62, '\phi'], [63, '\pi'],
                [64, '\pm'], [65, '\prime'], [66, 'q'], [67, '\Rightarrow'], [68, '\sigma'], [69, '\sin'],
                [70, '\sqrt'], [71, '\sum'], [72, '\\tan'], [73, '\\theta'], [74, '\\times'],
                [75, 'u'], [76, 'v'], [77, 'w'], [78, 'y'], [79, 'z'], [80, '\{'], [81, '\}']]
    res = ""


    for letter in letters_extract(im_path):
        res += str(emnist_predict_img(model, letter[2], to_latex)) + " "
    return res



# импортим обученную модель
#
model = keras.models.load_model('pretrained_model.h5')

# проверка работы модели
if __name__ == "__main__":
    res = photo_to_latex("image.png", model)
    print(res)