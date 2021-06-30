-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Окт 16 2020 г., 19:47
-- Версия сервера: 5.6.43-84.3-log
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `kronotexru`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `published` tinyint(1) NOT NULL,
  `sort` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_id`, `published`, `sort`, `created_at`, `updated_at`) VALUES
(4, 'Ламинат', NULL, 1, 1, NULL, NULL),
(5, 'Amazone', 4, 1, 2, NULL, NULL),
(6, 'Dynamic', 4, 1, 3, NULL, NULL),
(7, 'Dynamic plus', 4, 1, 4, NULL, NULL),
(8, 'Exquisit', 4, 1, 5, NULL, NULL),
(9, 'Exquisit plus', 4, 1, 6, NULL, NULL),
(10, 'Mammut', 4, 1, 7, NULL, NULL),
(11, 'Mammut plus', 4, 1, 8, NULL, NULL),
(12, 'Mega plus', 4, 1, 9, NULL, NULL),
(13, 'Robusto', 4, 1, 10, NULL, NULL),
(14, 'Aqua robusto', 4, 1, 11, NULL, NULL),
(15, 'Herringbone', 4, 1, 12, NULL, NULL),
(16, 'Плинтус', NULL, 1, NULL, NULL, NULL),
(17, 'Подложка', NULL, 0, NULL, NULL, NULL),
(18, 'Герметик', NULL, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `categories_views`
--

CREATE TABLE `categories_views` (
  `category_id` int(10) UNSIGNED NOT NULL,
  `page_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `categories_views`
--

INSERT INTO `categories_views` (`category_id`, `page_id`) VALUES
(4, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `category_characteristics`
--

CREATE TABLE `category_characteristics` (
  `category_id` int(10) UNSIGNED NOT NULL,
  `characteristic_id` int(10) UNSIGNED NOT NULL,
  `value` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `category_characteristics`
--

INSERT INTO `category_characteristics` (`category_id`, `characteristic_id`, `value`) VALUES
(5, 59, '10'),
(5, 60, '33'),
(5, 69, '1.3'),
(5, 71, 'Да'),
(6, 59, '8'),
(6, 60, '32'),
(6, 69, '2.131'),
(7, 59, '8'),
(7, 60, '32'),
(7, 69, '2.131'),
(8, 59, '8'),
(8, 60, '32'),
(8, 69, '2.131'),
(9, 59, '8'),
(9, 60, '32'),
(9, 69, '2.694'),
(10, 59, '12'),
(10, 60, '33'),
(10, 69, '1.387'),
(10, 71, 'Да'),
(11, 59, '10'),
(11, 60, '33'),
(11, 69, '1.8'),
(11, 71, 'Да'),
(12, 59, '8'),
(12, 69, '2.249'),
(13, 59, '12'),
(13, 60, '33'),
(13, 69, '1.293'),
(13, 71, 'Да'),
(14, 59, '12'),
(14, 60, '33'),
(14, 69, '1.318'),
(15, 59, '8'),
(15, 60, '32'),
(15, 69, '1.238'),
(15, 71, 'Да');

-- --------------------------------------------------------

--
-- Структура таблицы `category_images`
--

CREATE TABLE `category_images` (
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `category_images`
--

INSERT INTO `category_images` (`name`, `category_id`) VALUES
('laminat.jpg', 4),
('laminat-amazone-33-kl-10mm-dub-3.jpg', 5),
('dynamic.png', 6),
('dynamic-plus.jpg', 7),
('laminat-exquisit.jpg', 8),
('laminat-kronotex-exquisit-plus.jpg', 9),
('laminat-kronotex-mammut.jpg', 10),
('laminat-kronotex-mammut-plus.jpg', 11),
('laminat-kronotex-mega-plus.jpg', 12),
('laminat-kronotex-robusto.jpg', 13),
('laminat-aqua-robusto.jpg', 14),
('laminat-kronotex-herringbone.jpg', 15),
('plintus.jpg', 16),
('podlozhka.jpg', 17),
('click-guard.jpg', 18);

-- --------------------------------------------------------

--
-- Структура таблицы `category_prices`
--

CREATE TABLE `category_prices` (
  `category_id` int(10) UNSIGNED NOT NULL,
  `price` int(11) NOT NULL,
  `actual_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `category_prices`
--

INSERT INTO `category_prices` (`category_id`, `price`, `actual_on`) VALUES
(5, 227500, '2020-09-15 09:52:32'),
(6, 266375, '2020-09-15 09:52:32'),
(7, 266375, '2020-09-15 09:52:32'),
(8, 287685, '2020-09-15 09:52:32'),
(9, 377160, '2020-09-15 09:52:32'),
(10, 339815, '2020-09-15 09:52:32'),
(11, 405000, '2020-09-15 09:52:32'),
(12, 337350, '2020-09-15 09:52:32'),
(13, 257307, '2020-09-15 09:52:32'),
(14, 354542, '2020-09-15 09:52:32'),
(15, 308262, '2020-09-15 09:52:32');

-- --------------------------------------------------------

--
-- Структура таблицы `category_services`
--

CREATE TABLE `category_services` (
  `category_id` int(10) UNSIGNED NOT NULL,
  `service_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `category_services`
--

INSERT INTO `category_services` (`category_id`, `service_id`) VALUES
(4, 2),
(4, 3),
(4, 4),
(16, 5),
(16, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `characteristics`
--

CREATE TABLE `characteristics` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `characteristics`
--

INSERT INTO `characteristics` (`id`, `name`, `unit_id`) VALUES
(57, 'Длина', 2),
(58, 'Ширина', 2),
(59, 'Толщина', 2),
(60, 'Класс', NULL),
(61, 'Количество фасок', NULL),
(62, 'Количество полос', NULL),
(63, 'Производитель', NULL),
(64, 'Страна', NULL),
(65, 'Стилизация', NULL),
(66, 'Тип помещения', NULL),
(67, 'Тип соединения', NULL),
(68, 'В упаковке, шт.', NULL),
(69, 'Площадь упаковки', 3),
(70, 'Вес упаковки', 4),
(71, 'Влагостойкость', NULL),
(72, 'Высота', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `customers`
--

CREATE TABLE `customers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` decimal(11,0) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adres` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `customers`
--

INSERT INTO `customers` (`id`, `name`, `phone`, `email`, `adres`, `created_at`, `updated_at`) VALUES
(7, 'Тест', 71111111111, 'protopopov-alexey@bk.ru', 'Test', '2020-10-12 02:10:42', '2020-10-12 02:10:42'),
(8, 'Имя', 78888888888, 'protopopov-alexey@bk.ru', 'adrse', '2020-10-12 02:15:01', '2020-10-12 02:15:01'),
(9, 'Тест 2', 72222222222, 'protopopov-alexey@bk.ru', 'adres', '2020-10-12 02:29:23', '2020-10-12 02:29:23'),
(10, 'Имя', 71111111111, 'protopopov-alexey@bk.ru', 'adres', '2020-10-12 02:48:29', '2020-10-12 02:48:29'),
(11, 'Name', 74444444444, 'prdsd', 'aaf', '2020-10-12 02:50:22', '2020-10-12 02:50:22'),
(12, 'Тест', 71111111111, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-12 16:05:49', '2020-10-12 16:05:49'),
(13, 'Тест', 71111111111, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-12 16:17:31', '2020-10-12 16:17:31'),
(14, 'Тест', 71111111111, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-13 04:00:08', '2020-10-13 04:00:08'),
(15, 'Тест', 71111111111, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-13 04:03:37', '2020-10-13 04:03:37'),
(16, 'Тест', 71111111111, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-13 04:40:12', '2020-10-13 04:40:12'),
(17, 'Тест', 71111111111, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-13 04:48:21', '2020-10-13 04:48:21'),
(18, 'Игорь Белоус', 77911924059, '9240590@mail.ru', 'Купчинская', '2020-10-14 14:30:54', '2020-10-14 14:30:54'),
(19, 'Тест', 71234567891, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-15 13:31:22', '2020-10-15 13:31:22'),
(20, 'Тест', 71234567891, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-15 13:35:20', '2020-10-15 13:35:20'),
(21, 'Тест', 71234567891, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-15 13:44:05', '2020-10-15 13:44:05'),
(22, 'Тест', 71234567891, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-15 14:14:41', '2020-10-15 14:14:41'),
(23, 'Тест', 71234567891, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-15 14:16:57', '2020-10-15 14:16:57'),
(24, 'Тест', 71234567891, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-15 14:18:29', '2020-10-15 14:18:29'),
(25, 'Тест', 71234567891, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-15 14:23:19', '2020-10-15 14:23:19'),
(26, 'Тест', 71234567891, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-15 14:37:04', '2020-10-15 14:37:04'),
(27, 'Тест', 71234567891, 'protopopov-alexey@bk.ru', 'Адрес тест', '2020-10-15 14:40:01', '2020-10-15 14:40:01');

-- --------------------------------------------------------

--
-- Структура таблицы `group_products`
--

CREATE TABLE `group_products` (
  `product_group_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `laminate_product_views`
--

CREATE TABLE `laminate_product_views` (
  `page_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `laminate_product_views`
--

INSERT INTO `laminate_product_views` (`page_id`, `product_id`, `category_id`) VALUES
(4, 1, 4),
(5, 2, 4),
(18, 3, 4),
(19, 4, 4),
(20, 5, 4),
(21, 6, 4),
(22, 7, 4),
(23, 8, 4),
(4, 11, 16),
(5, 16, 16),
(18, 17, 16),
(19, 18, 16),
(20, 19, 16),
(21, 20, 16),
(22, 21, 16),
(4, 12, 17),
(4, 13, 17),
(4, 14, 17),
(5, 12, 17),
(5, 13, 17),
(5, 14, 17),
(18, 12, 17),
(18, 13, 17),
(18, 14, 17),
(19, 12, 17),
(19, 13, 17),
(19, 14, 17),
(20, 12, 17),
(20, 13, 17),
(20, 14, 17),
(21, 12, 17),
(21, 13, 17),
(21, 14, 17),
(22, 12, 17),
(22, 13, 17),
(22, 14, 17),
(4, 15, 18),
(5, 15, 18),
(18, 15, 18),
(19, 15, 18),
(20, 15, 18),
(21, 15, 18),
(22, 15, 18);

-- --------------------------------------------------------

--
-- Структура таблицы `magazine_sales`
--

CREATE TABLE `magazine_sales` (
  `sale_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `price_history_id` int(10) UNSIGNED NOT NULL,
  `quantity` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `magazine_sales`
--

INSERT INTO `magazine_sales` (`sale_id`, `product_id`, `price_history_id`, `quantity`) VALUES
(7, 4, 17, 43),
(7, 12, 26, 6),
(7, 15, 29, 7),
(7, 18, 33, 21),
(8, 3, 16, 43),
(8, 12, 26, 6),
(8, 15, 29, 7),
(8, 17, 31, 21),
(9, 6, 19, 43),
(9, 12, 26, 6),
(9, 15, 29, 7),
(9, 20, 35, 21),
(10, 7, 20, 43),
(10, 12, 26, 6),
(10, 15, 29, 7),
(10, 21, 36, 21),
(11, 3, 16, 85),
(11, 12, 26, 11),
(11, 15, 29, 14),
(11, 17, 31, 46),
(12, 5, 18, 39),
(12, 13, 27, 4),
(12, 15, 29, 7),
(12, 19, 34, 21),
(13, 5, 18, 39),
(13, 13, 27, 4),
(13, 15, 29, 7),
(13, 19, 34, 21),
(14, 3, 16, 39),
(14, 12, 26, 5),
(14, 15, 29, 7),
(14, 17, 31, 21),
(15, 3, 16, 39),
(15, 12, 26, 5),
(15, 15, 29, 7),
(15, 17, 31, 21),
(16, 3, 16, 39),
(16, 12, 26, 5),
(16, 15, 29, 7),
(16, 17, 31, 21),
(17, 3, 16, 39),
(17, 12, 26, 5),
(17, 15, 29, 7),
(17, 17, 31, 21),
(18, 1, 14, 44),
(18, 11, 24, 23),
(18, 12, 26, 6),
(18, 15, 29, 8),
(19, 1, 14, 43),
(19, 11, 24, 21),
(19, 13, 27, 4),
(19, 15, 29, 7),
(20, 1, 14, 43),
(20, 11, 24, 21),
(20, 13, 27, 4),
(20, 15, 29, 7),
(21, 1, 14, 43),
(21, 11, 24, 21),
(21, 13, 27, 4),
(21, 15, 29, 7),
(22, 1, 14, 43),
(22, 11, 24, 21),
(22, 13, 27, 4),
(22, 15, 29, 7),
(23, 1, 14, 43),
(23, 11, 24, 21),
(23, 13, 27, 4),
(23, 15, 29, 7),
(24, 1, 14, 43),
(24, 11, 24, 21),
(24, 13, 27, 4),
(24, 15, 29, 7),
(25, 1, 14, 43),
(25, 11, 24, 21),
(25, 13, 27, 4),
(25, 15, 29, 7),
(26, 1, 14, 43),
(26, 11, 24, 21),
(26, 13, 27, 4),
(26, 15, 29, 7),
(27, 1, 14, 43),
(27, 11, 24, 21),
(27, 13, 27, 4),
(27, 15, 29, 7);

-- --------------------------------------------------------

--
-- Структура таблицы `menu_categories`
--

CREATE TABLE `menu_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(11) NOT NULL,
  `sort` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `menu_images`
--

CREATE TABLE `menu_images` (
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_category_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` tinyint(4) NOT NULL DEFAULT '0',
  `page_id` int(10) UNSIGNED NOT NULL,
  `menu_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `menu_items`
--

INSERT INTO `menu_items` (`id`, `parent_id`, `name`, `sort_order`, `page_id`, `menu_number`) VALUES
(1, NULL, 'Ламинат', 6, 1, 2),
(2, NULL, 'Главная', 0, 17, 1),
(3, NULL, 'Укладка/гарантии', 1, 27, 1),
(4, NULL, 'Оплата', 2, 26, 1),
(5, NULL, 'Доставка', 3, 25, 1),
(6, NULL, 'Возврат', 4, 28, 1),
(7, NULL, 'Контакты', 5, 24, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_09_01_160807_create_pages_table', 1),
(4, '2019_09_02_124901_create_menu_categories_table', 1),
(5, '2019_09_02_160246_create_units_table', 1),
(6, '2019_09_02_160247_create_categories_table', 1),
(7, '2019_09_02_160248_create_products_table', 1),
(8, '2019_09_03_205225_create_product_views_table', 1),
(9, '2019_09_08_211626_create_page_views_table', 1),
(10, '2019_09_09_190517_create_product_images_table', 1),
(11, '2019_09_09_213439_create_price_histories_table', 1),
(12, '2019_09_09_213440_create_prices_table', 1),
(13, '2019_09_10_214428_create_products_views_table', 1),
(14, '2019_09_11_134432_create_customers_table', 1),
(15, '2019_09_11_140714_create_sales_table', 1),
(16, '2019_09_11_142145_create_magazine_sales_table', 1),
(17, '2019_09_30_224310_create_roles_table', 1),
(18, '2019_09_30_224636_create_user_roles_table', 1),
(19, '2019_10_28_021138_create_routes_table', 1),
(20, '2019_10_28_022005_create_page_routes_table', 1),
(21, '2019_10_28_202428_create_page_parameters_table', 1),
(22, '2019_11_01_011118_create_drafts_table', 1),
(23, '2019_11_05_200901_create_product_stocks_table', 1),
(24, '2019_11_17_212447_create_menu_images_table', 1),
(25, '2019_11_17_221232_create_categories_views_table', 1),
(26, '2019_11_18_012828_create_category_images_table', 1),
(27, '2019_11_23_015831_create_top_menu_categories_table', 1),
(28, '2020_01_13_061312_create_product_groups_table', 1),
(29, '2020_01_13_061501_create_group_products_table', 1),
(30, '2020_01_13_063145_create_product_group_views_table', 1),
(31, '2020_01_24_103210_create_purchased_bundles_table', 1),
(32, '2020_01_24_103211_create_purchased_products_table', 1),
(33, '2020_02_10_194635_create_product_group_images_table', 1),
(34, '2020_05_23_015303_create_menu_items_table', 1),
(35, '2020_08_21_170810_create_characteristics_table', 2),
(36, '2020_08_21_171357_create_product_characteristics_table', 2),
(37, '2020_08_27_173145_create_services_table', 3),
(38, '2020_08_27_175812_create_service_price_histories_table', 4),
(39, '2020_08_27_175853_create_service_prices_table', 4),
(40, '2020_09_14_183653_create_category_characteristics_table', 5),
(41, '2020_09_15_123020_create_category_prices_table', 6),
(42, '2020_09_18_223435_create_category_services_table', 7),
(43, '2020_09_20_021302_create_service_magazine_sales_table', 8),
(44, '2020_09_25_153240_create_service_units_table', 8),
(45, '2020_09_25_153702_create_service_characteristics_table', 8),
(46, '2020_09_26_225602_create_plinth_views_table', 9),
(47, '2020_09_27_113907_create_laminate_views_table', 10);

-- --------------------------------------------------------

--
-- Структура таблицы `pages`
--

CREATE TABLE `pages` (
  `id` int(10) UNSIGNED NOT NULL,
  `uri` varchar(255) CHARACTER SET cp1251 NOT NULL,
  `title` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `published` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `pages`
--

INSERT INTO `pages` (`id`, `uri`, `title`, `description`, `content`, `published`, `created_at`, `updated_at`) VALUES
(1, 'laminat', 'Ламинат', NULL, '<p><br></p>', 1, '2020-08-19 14:44:47', '2020-08-19 14:44:47'),
(2, 'laminat/amazone', 'Amazone', NULL, '<p><br></p>', 1, '2020-08-19 16:21:28', '2020-08-29 16:04:51'),
(4, 'amazone/laminat-kronotex-amazone-33-kl-10mm-dub-montmelo-serebryaniy-d-3662', 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Монтмело Серебряный D 3662', NULL, '<p><br></p>', 1, '2020-08-20 14:52:03', '2020-08-20 14:52:03'),
(5, 'laminat/amazone/laminat-kronotex-amazone-33-kl-10mm-dub-nebroskiy-d-3668', 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Неброский D 3668', NULL, '<p><br></p>', 1, '2020-08-25 21:25:07', '2020-08-29 22:49:56'),
(6, 'laminat/dynamic', 'Dynamic', NULL, '<p><br></p>', 1, '2020-08-29 15:59:17', '2020-08-29 16:05:03'),
(7, 'laminat/dynamic-plus', 'Dynamic plus', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-29 16:08:30', '2020-08-29 16:08:30'),
(8, 'laminat/exquisit', 'Exquisit', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-29 16:12:37', '2020-08-29 16:12:37'),
(10, 'laminat/exquisit-plus', 'Exquisit plus', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-29 16:29:02', '2020-08-29 16:29:02'),
(11, 'laminat/mammut', 'Mammut', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-29 16:32:57', '2020-08-29 16:32:57'),
(12, 'laminat/mammut-plus', 'Mammut plus', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-29 16:35:38', '2020-08-29 16:35:38'),
(13, 'laminat-mega-plus', 'Mega plus', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-29 16:39:37', '2020-08-29 16:39:37'),
(14, 'laminat/robusto', 'Robusto', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-29 16:42:49', '2020-08-29 16:42:49'),
(15, 'laminat/aqua-robusto', 'Aqua robusto', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-29 16:57:40', '2020-08-29 16:57:40'),
(16, 'laminat/herringbone', 'Herringbone', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-29 17:02:04', '2020-08-29 17:02:04'),
(17, '', 'Ламинат Kronotex', NULL, '<h2>ДОБРО ПОЖАЛОВАТЬ В МАГАЗИН НАПОЛЬНЫХ ПОКРЫТИЙ &hellip;</h2>\r\n<p>Магазин Ламинат Проф находится в 300 метрах от ст. &nbsp;метро Елизаровская, по адресу&nbsp;СПб, &nbsp;ул. Бабушкина,&nbsp;&nbsp;д.2. Имеется удобная парковка.</p>\r\n<p>На рынке напольных покрытий наша компания присутствует с 2000 года. В нашем магазине представлена продукция &nbsp;более 20 производителей, свыше 1000 наименований напольных покрытий : ламинат, паркет, кварцвиниловая плитка ( лидер продаж),пробковые полы а также ковролин, линолеум ,специальные покрытия для спортзалов , детских&nbsp; спортивных площадок, гаражей , промышленных объектов, уличные покрытия. Ко всем напольным покрытиям можно подобрать сопутствующие товары.</p>\r\n<div id=\"gallery-1\" class=\"gallery galleryid-5 gallery-columns-3 gallery-size-thumbnail\" style=\"display: grid; grid-template-columns: 1fr 1fr 1fr; margin: auto; color: #333333; font-family: \'Open Sans\', sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;\">\r\n<dl class=\"gallery-item\" style=\"margin: 10px 0px 0px; padding: 0px; float: left; text-align: center;\">\r\n<dt class=\"gallery-icon landscape\"><a style=\"text-decoration: none; outline: none; overflow-wrap: break-word; word-break: break-word; color: #ccddff;\" href=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125536_resized.jpg\" data-slb-active=\"1\" data-slb-asset=\"2005920463\" data-slb-internal=\"0\" data-slb-group=\"5\"><img class=\"attachment-thumbnail size-thumbnail lazyloaded\" style=\"max-width: 100%; height: auto; border: 2px solid #cfcfcf; opacity: 1; transition: opacity 400ms ease 0ms;\" src=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125536_resized-150x150.jpg\" alt=\"\" width=\"150\" height=\"150\" data-srcset=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125536_resized-150x150.jpg 150w, https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125536_resized-300x300.jpg 300w, https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125536_resized-100x100.jpg 100w\" data-src=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125536_resized-150x150.jpg\" data-sizes=\"(max-width: 150px) 100vw, 150px\" /></a></dt>\r\n</dl>\r\n<dl class=\"gallery-item\" style=\"margin: 10px 0px 0px; padding: 0px; float: left; text-align: center;\">\r\n<dt class=\"gallery-icon landscape\"><a style=\"text-decoration: none; outline: none; overflow-wrap: break-word; word-break: break-word; color: #ccddff;\" href=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125505_resized.jpg\" data-slb-active=\"1\" data-slb-asset=\"2129450952\" data-slb-internal=\"0\" data-slb-group=\"5\"><img class=\"attachment-thumbnail size-thumbnail lazyloaded\" style=\"max-width: 100%; height: auto; border: 2px solid #cfcfcf; opacity: 1; transition: opacity 400ms ease 0ms;\" src=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125505_resized-150x150.jpg\" alt=\"\" width=\"150\" height=\"150\" data-srcset=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125505_resized-150x150.jpg 150w, https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125505_resized-300x300.jpg 300w, https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125505_resized-100x100.jpg 100w\" data-src=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125505_resized-150x150.jpg\" data-sizes=\"(max-width: 150px) 100vw, 150px\" /></a></dt>\r\n</dl>\r\n<dl class=\"gallery-item\" style=\"margin: 10px 0px 0px; padding: 0px; float: left; text-align: center;\">\r\n<dt class=\"gallery-icon landscape\"><a style=\"text-decoration: none; outline: none; overflow-wrap: break-word; word-break: break-word; color: #ccddff;\" href=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125631_resized.jpg\" data-slb-active=\"1\" data-slb-asset=\"935529807\" data-slb-internal=\"0\" data-slb-group=\"5\"><img class=\"attachment-thumbnail size-thumbnail lazyloaded\" style=\"max-width: 100%; height: auto; border: 2px solid #cfcfcf; opacity: 1; transition: opacity 400ms ease 0ms;\" src=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125631_resized-150x150.jpg\" alt=\"\" width=\"150\" height=\"150\" data-srcset=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125631_resized-150x150.jpg 150w, https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125631_resized-300x300.jpg 300w, https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125631_resized-100x100.jpg 100w\" data-src=\"https://laminatprof.ru/wp-content/uploads/2019/06/20190615_125631_resized-150x150.jpg\" data-sizes=\"(max-width: 150px) 100vw, 150px\" /></a></dt>\r\n</dl>\r\n</div>\r\n<p>Как правильно выбрать тот или иной тип покрытий , правильно произвести его настил, вас проконсультируют наши специалисты, которые регулярно посещают тренинги проводимые компаниями производителей. Вы также можете заказать профессиональный настил приобретённых &nbsp;покрытий .</p>\r\n<p>Нашими клиентами являются как частные лица так и юрлица.</p>\r\n<p>И о главном , в магазине существует программа лояльности и скидок для всех клиентов.</p>\r\n<p>&nbsp; &nbsp; &nbsp; Ждём вас на Бабушкина д.2.</p>', 1, '2020-08-29 19:56:15', '2020-08-29 19:56:15'),
(18, 'laminat/amazone/laminat-kronotex-amazone-33-kl-10mm-dub-portoviy-seriy-d-3572', 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Портовый Серый D 3572', NULL, '<p><br></p>', 1, '2020-08-29 22:56:35', '2020-08-29 23:05:33'),
(19, 'laminat/amazone/laminat-kronotex-amazone-33-kl-10mm-dub-prestizh-beliy-d-3239', 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Престиж Белый D 3239', NULL, '<p><br></p>', 1, '2020-08-29 23:04:23', '2020-09-16 16:06:45'),
(20, 'laminat/amazone/laminat-kronotex-amazone-33-kl-10mm-dub-prestizh-naturalniy-d-4166', 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Престиж Натуральный D 4166', NULL, '<p><br></p>', 1, '2020-08-29 23:14:06', '2020-09-16 16:06:58'),
(21, 'laminat/amazone/laminat-kronotex-amazone-33-kl-10mm-dub-prestizh-svetliy-d-4169', 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Престиж Светлый D 4169', NULL, '<p><br></p>', 1, '2020-08-29 23:17:58', '2020-09-16 16:07:12'),
(22, 'laminat/amazone/laminat-kronotex-amazone-33-kl-10mm-dub-prestizh-seriy-d-4167', 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Престиж Серый D 4167', NULL, '<p><br></p>', 1, '2020-08-29 23:22:19', '2020-09-16 16:07:26'),
(23, 'laminat/amazone/laminat-kronotex-amazone-33-kl-10mm-dub-taho-d-4686', 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Тахо D 4686', NULL, '<p><br></p>', 0, '2020-08-29 23:26:32', '2020-09-16 16:07:46'),
(24, 'kontakty', 'Контакты', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-30 19:23:09', '2020-08-30 19:23:09'),
(25, 'dostavka', 'Доставка', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-30 19:25:36', '2020-08-30 19:25:36'),
(26, 'oplata', 'Оплата', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-30 19:27:55', '2020-08-30 19:27:55'),
(27, 'ukladka-garantii', 'Укладка/гарантии', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-30 19:29:19', '2020-08-30 19:29:19'),
(28, 'vozvrat', 'Возврат', NULL, '<p><br data-mce-bogus=\"1\"></p>', 1, '2020-08-30 19:30:00', '2020-08-30 19:30:00'),
(29, 'plintus', 'Плинтус', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-09-26 17:21:23', '2020-09-26 17:21:23'),
(31, 'plintus/laminirovanniy-plintus-kronotex-dub-montmelo-serebryaniy-d3662', 'Ламинированный плинтус Kronotex Дуб Монтмело серебряный D3662', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-09-26 20:12:30', '2020-09-26 20:12:30'),
(32, 'podlozhka', 'Подложка', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-09-27 18:14:07', '2020-09-27 18:14:07'),
(33, 'podlozhka/podlozhka-profitex-3-mm', 'Подложка Profitex, 3 мм', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-09-28 09:05:19', '2020-09-28 09:05:19'),
(34, 'podlozhka/podlozhka-quick-step-3-mm', 'Подложка Quick Step, 3 мм', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-09-28 09:37:36', '2020-09-28 09:37:36'),
(35, 'podlozhka/podlozhka-tuplex-3-mm', 'Подложка Tuplex, 3 мм', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-09-28 09:45:02', '2020-09-28 09:45:02'),
(36, 'germetik', 'Герметик', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-09-28 20:35:08', '2020-09-28 20:35:08'),
(37, 'germetik/germetik-dlya-beskleevih-laminatov-click-guard', 'Герметик для бесклеевых ламинатов Click Guard', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-09-28 20:41:47', '2020-09-28 20:41:47'),
(38, 'plintus/laminirovanniy-plintus-kronotex-dub-nebroskiy-d3668', 'Ламинированный плинтус Kronotex Дуб неброский D3668', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-10-01 11:42:05', '2020-10-01 11:42:05'),
(39, 'plintus/laminirovanniy-plintus-kronotex-dub-portoviy-seriy-d3572', 'Ламинированный плинтус Kronotex Дуб портовый серый D3572', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-10-01 11:49:27', '2020-10-01 11:49:27'),
(40, 'plintus/laminirovanniy-plintus-kronotex-dub-prestizh-beliy-d3239', 'Ламинированный плинтус Kronotex Дуб Престиж белый D3239', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-10-01 11:58:06', '2020-10-01 11:58:06'),
(41, 'plintus/laminirovanniy-plintus-kronotex-dub-prestizh-naturalniy-d4166', 'Ламинированный плинтус Kronotex Дуб Престиж натуральный D4166', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-10-01 12:03:34', '2020-10-01 12:03:34'),
(42, 'plintus/laminirovanniy-plintus-kronotex-dub-prestizh-svetliy-d4169', 'Ламинированный плинтус Kronotex Дуб Престиж светлый D4169', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-10-01 13:23:13', '2020-10-01 13:23:13'),
(43, 'plintus/laminirovanniy-plintus-kronotex-dub-prestizh-seriy-d4167', 'Ламинированный плинтус Kronotex Дуб Престиж серый D4167', NULL, '<p><br data-mce-bogus=\"1\"></p>', 0, '2020-10-01 13:27:03', '2020-10-01 13:27:03');

-- --------------------------------------------------------

--
-- Структура таблицы `page_parameters`
--

CREATE TABLE `page_parameters` (
  `page_id` int(10) UNSIGNED NOT NULL,
  `parameterizable_id` int(10) UNSIGNED NOT NULL,
  `parameterizable_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `page_routes`
--

CREATE TABLE `page_routes` (
  `route_id` int(10) UNSIGNED NOT NULL,
  `page_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `page_routes`
--

INSERT INTO `page_routes` (`route_id`, `page_id`) VALUES
(3, 1),
(2, 2),
(1, 4),
(1, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(5, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(6, 24),
(4, 25),
(4, 26),
(4, 27),
(4, 28),
(2, 29),
(8, 31),
(2, 32),
(1, 33),
(1, 34),
(1, 35),
(2, 36),
(1, 37),
(8, 38),
(8, 39),
(8, 40),
(8, 41),
(8, 42),
(8, 43);

-- --------------------------------------------------------

--
-- Структура таблицы `page_views`
--

CREATE TABLE `page_views` (
  `page_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `page_views`
--

INSERT INTO `page_views` (`page_id`) VALUES
(25),
(26),
(27),
(28);

-- --------------------------------------------------------

--
-- Структура таблицы `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `plinth_views`
--

CREATE TABLE `plinth_views` (
  `product_id` int(10) UNSIGNED NOT NULL,
  `page_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `plinth_views`
--

INSERT INTO `plinth_views` (`product_id`, `page_id`) VALUES
(11, 31),
(16, 38),
(17, 39),
(18, 40),
(19, 41),
(20, 42),
(21, 43);

-- --------------------------------------------------------

--
-- Структура таблицы `prices`
--

CREATE TABLE `prices` (
  `product_id` int(10) UNSIGNED NOT NULL,
  `price_history_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `prices`
--

INSERT INTO `prices` (`product_id`, `price_history_id`) VALUES
(1, 14),
(2, 15),
(3, 16),
(4, 17),
(5, 18),
(6, 19),
(7, 20),
(8, 21),
(11, 24),
(12, 26),
(13, 27),
(14, 28),
(15, 29),
(17, 31),
(16, 32),
(18, 33),
(19, 34),
(20, 35),
(21, 36);

-- --------------------------------------------------------

--
-- Структура таблицы `price_histories`
--

CREATE TABLE `price_histories` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `price` int(11) NOT NULL,
  `actual_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `price_histories`
--

INSERT INTO `price_histories` (`id`, `product_id`, `price`, `actual_on`) VALUES
(1, 1, 195000, '2020-08-20 14:52:03'),
(2, 2, 11000, '2020-08-25 21:25:06'),
(3, 2, 155000, '2020-08-29 22:49:54'),
(4, 2, 195000, '2020-08-29 22:51:20'),
(5, 3, 195000, '2020-08-29 22:56:33'),
(6, 4, 201500, '2020-08-29 23:04:22'),
(7, 1, 201500, '2020-08-29 23:04:56'),
(8, 2, 201500, '2020-08-29 23:05:11'),
(9, 3, 201500, '2020-08-29 23:05:32'),
(10, 5, 201500, '2020-08-29 23:14:05'),
(11, 6, 201500, '2020-08-29 23:17:57'),
(12, 7, 201500, '2020-08-29 23:22:18'),
(13, 8, 201500, '2020-08-29 23:26:31'),
(14, 1, 227500, '2020-09-16 16:05:43'),
(15, 2, 227500, '2020-09-16 16:06:19'),
(16, 3, 227500, '2020-09-16 16:06:32'),
(17, 4, 227500, '2020-09-16 16:06:44'),
(18, 5, 227500, '2020-09-16 16:06:57'),
(19, 6, 227500, '2020-09-16 16:07:11'),
(20, 7, 227500, '2020-09-16 16:07:25'),
(21, 8, 227500, '2020-09-16 16:07:45'),
(24, 11, 45000, '2020-09-26 20:12:29'),
(26, 12, 110000, '2020-09-28 09:05:19'),
(27, 13, 132000, '2020-09-28 09:37:35'),
(28, 14, 165000, '2020-09-28 09:45:02'),
(29, 15, 42000, '2020-09-28 20:41:46'),
(30, 16, 0, '2020-10-01 11:42:05'),
(31, 17, 45000, '2020-10-01 11:49:26'),
(32, 16, 45000, '2020-10-01 11:50:17'),
(33, 18, 45000, '2020-10-01 11:58:05'),
(34, 19, 45000, '2020-10-01 12:03:34'),
(35, 20, 45000, '2020-10-01 13:23:13'),
(36, 21, 45000, '2020-10-01 13:27:02');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vendor_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit_id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `vendor_code`, `unit_id`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Монтмело Серебряный D 3662', '000001', 1, 5, '2020-08-20 14:52:03', '2020-08-20 14:52:03'),
(2, 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Неброский D 3668', '000002', 1, 5, '2020-08-25 21:25:06', '2020-08-29 22:49:54'),
(3, 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Портовый Серый D 3572', '000003', 1, 5, '2020-08-29 22:56:33', '2020-08-29 22:56:33'),
(4, 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Престиж Белый D 3239', '000004', 1, 5, '2020-08-29 23:04:22', '2020-08-29 23:04:22'),
(5, 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Престиж Натуральный D 4166', '0000004', 1, 5, '2020-08-29 23:14:05', '2020-08-29 23:14:05'),
(6, 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Престиж Светлый D 4169', '0000005', 1, 5, '2020-08-29 23:17:57', '2020-08-29 23:17:57'),
(7, 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Престиж Серый D 4167', '000006', 1, 5, '2020-08-29 23:22:18', '2020-08-29 23:22:18'),
(8, 'Ламинат Kronotex Amazone 33 кл.10мм Дуб Тахо D 4686', '000007', 1, 5, '2020-08-29 23:26:31', '2020-08-29 23:26:31'),
(11, 'Ламинированный плинтус Kronotex Дуб Монтмело серебряный D3662', '000008', 5, 16, '2020-09-26 20:12:29', '2020-09-26 20:12:29'),
(12, 'Подложка Profitex, 3 мм', '0000010', 1, 17, '2020-09-28 09:05:19', '2020-09-28 09:05:19'),
(13, 'Подложка Quick Step, 3 мм', '000011', 1, 17, '2020-09-28 09:37:34', '2020-09-28 09:37:34'),
(14, 'Подложка Tuplex, 3 мм', '000012', 1, 17, '2020-09-28 09:45:02', '2020-09-28 09:45:02'),
(15, 'Герметик для бесклеевых ламинатов Click Guard', '000013', 1, 18, '2020-09-28 20:41:46', '2020-09-28 20:41:46'),
(16, 'Ламинированный плинтус Kronotex Дуб неброский D3668', '000014', 5, 16, '2020-10-01 11:42:05', '2020-10-01 11:42:05'),
(17, 'Ламинированный плинтус Kronotex Дуб портовый серый D3572', '000015', 5, 16, '2020-10-01 11:49:26', '2020-10-01 11:49:26'),
(18, 'Ламинированный плинтус Kronotex Дуб Престиж белый D3239', '000016', 5, 16, '2020-10-01 11:58:05', '2020-10-01 11:58:05'),
(19, 'Ламинированный плинтус Kronotex Дуб Престиж натуральный D4166', '000017', 5, 16, '2020-10-01 12:03:34', '2020-10-01 12:03:34'),
(20, 'Ламинированный плинтус Kronotex Дуб Престиж светлый D4169', '000018', 5, 16, '2020-10-01 13:23:13', '2020-10-01 13:23:13'),
(21, 'Ламинированный плинтус Kronotex Дуб Престиж серый D4167', '0000019', 5, 16, '2020-10-01 13:27:02', '2020-10-01 13:27:02');

-- --------------------------------------------------------

--
-- Структура таблицы `products_views`
--

CREATE TABLE `products_views` (
  `category_id` int(10) UNSIGNED NOT NULL,
  `page_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `products_views`
--

INSERT INTO `products_views` (`category_id`, `page_id`) VALUES
(5, 2),
(6, 6),
(7, 7),
(8, 8),
(9, 10),
(10, 11),
(11, 12),
(12, 13),
(13, 14),
(14, 15),
(15, 16),
(16, 29),
(17, 32),
(18, 36);

-- --------------------------------------------------------

--
-- Структура таблицы `product_characteristics`
--

CREATE TABLE `product_characteristics` (
  `product_id` int(10) UNSIGNED NOT NULL,
  `characteristic_id` int(10) UNSIGNED NOT NULL,
  `value` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `product_characteristics`
--

INSERT INTO `product_characteristics` (`product_id`, `characteristic_id`, `value`) VALUES
(1, 57, '1380'),
(1, 58, '157'),
(1, 59, '10'),
(1, 60, '33'),
(1, 61, '4'),
(1, 62, '1'),
(1, 63, 'Kronotex'),
(1, 64, 'Германия'),
(1, 65, 'под паркет'),
(1, 66, 'гостиная, коридор, офис, спальная'),
(1, 67, 'замковое'),
(1, 68, '6'),
(1, 69, '1.3'),
(1, 70, '15'),
(2, 57, '1380'),
(2, 58, '157'),
(2, 59, '10'),
(2, 60, '33'),
(2, 61, '4'),
(2, 62, '1'),
(2, 63, 'Kronotex'),
(2, 64, 'Германия'),
(2, 65, 'под паркет'),
(2, 66, 'гостиная, коридор, офис, спальная'),
(2, 67, 'замковое'),
(2, 68, '6'),
(2, 69, '1.3'),
(2, 70, '15'),
(3, 57, '1380'),
(3, 58, '157'),
(3, 59, '10'),
(3, 60, '33'),
(3, 61, '4'),
(3, 62, '1'),
(3, 63, 'Kronotex'),
(3, 64, 'Германия'),
(3, 65, 'под паркет'),
(3, 66, 'гостиная, коридор, офис, спальная'),
(3, 67, 'замковое'),
(3, 68, '6'),
(3, 69, '1.3'),
(3, 70, '15'),
(4, 57, '1380'),
(4, 58, '157'),
(4, 59, '10'),
(4, 60, '33'),
(4, 61, '4'),
(4, 62, '1'),
(4, 63, 'Kronotex'),
(4, 64, 'Германия'),
(4, 65, 'под паркет'),
(4, 66, 'гостиная, коридор, офис, спальная'),
(4, 67, 'замковое'),
(4, 68, '6'),
(4, 69, '1.3'),
(4, 70, '15'),
(5, 57, '1380'),
(5, 58, '157'),
(5, 59, '10'),
(5, 60, '33'),
(5, 61, '4'),
(5, 62, '1'),
(5, 63, 'Kronotex'),
(5, 64, 'Германия'),
(5, 65, 'под паркет'),
(5, 66, 'гостиная, коридор, офис, спальная'),
(5, 67, 'замковое'),
(5, 68, '6'),
(5, 69, '1.3'),
(5, 70, '15'),
(6, 57, '1380'),
(6, 58, '157'),
(6, 59, '10'),
(6, 60, '33'),
(6, 61, '4'),
(6, 62, '1'),
(6, 63, 'Kronotex'),
(6, 64, 'Германия'),
(6, 65, 'под паркет'),
(6, 66, 'гостиная, коридор, офис, спальная'),
(6, 67, 'замковое'),
(6, 68, '6'),
(6, 69, '1.3'),
(6, 70, '15'),
(7, 57, '1380'),
(7, 58, '157'),
(7, 59, '10'),
(7, 60, '33'),
(7, 61, '4'),
(7, 62, '1'),
(7, 63, 'Kronotex'),
(7, 64, 'Германия'),
(7, 65, 'под паркет'),
(7, 66, 'гостиная, коридор, офис, спальная'),
(7, 67, 'замковое'),
(7, 68, '6'),
(7, 69, '1.3'),
(7, 70, '15'),
(8, 57, '1380'),
(8, 58, '157'),
(8, 59, '10'),
(8, 60, '33'),
(8, 61, '4'),
(8, 62, '1'),
(8, 63, 'Kronotex'),
(8, 64, 'Германия'),
(8, 65, 'под паркет'),
(8, 66, 'гостиная, коридор, офис, спальная'),
(8, 67, 'замковое'),
(8, 68, '6'),
(8, 69, '1.3'),
(8, 70, '15'),
(11, 57, '2400'),
(11, 59, '19'),
(11, 63, '58'),
(11, 64, 'Kronotex'),
(11, 72, 'Германия'),
(12, 57, '10000'),
(12, 58, '1000'),
(12, 59, '3'),
(12, 63, 'Profitex'),
(12, 64, 'Россия'),
(12, 69, '10'),
(12, 71, 'Да'),
(13, 57, '15000'),
(13, 58, '1000'),
(13, 59, '3'),
(13, 63, 'Quick Step'),
(13, 64, 'Россия'),
(13, 69, '15'),
(13, 71, 'Да'),
(14, 57, '9100'),
(14, 58, '1100'),
(14, 59, '3'),
(14, 63, 'Tuplex'),
(14, 64, 'Россия'),
(14, 69, '10'),
(14, 71, 'Да'),
(15, 69, '8'),
(16, 57, '2400'),
(16, 59, '19'),
(16, 63, 'Kronotex'),
(16, 64, 'Германия'),
(16, 72, '58'),
(17, 57, '2400'),
(17, 59, '19'),
(17, 63, 'Kronotex'),
(17, 64, 'Германия'),
(17, 72, '58'),
(18, 57, '2400'),
(18, 59, '19'),
(18, 63, 'Kronotex'),
(18, 64, 'Германия'),
(18, 72, '58'),
(19, 57, '2400'),
(19, 59, '19'),
(19, 63, 'Kronotex'),
(19, 64, 'Германия'),
(19, 72, '58'),
(20, 57, '2400'),
(20, 59, '19'),
(20, 63, 'Kronotex'),
(20, 64, 'Германия'),
(20, 72, '58'),
(21, 57, '2400'),
(21, 59, '19'),
(21, 63, 'Kronotex'),
(21, 64, 'Германия'),
(21, 72, '58');

-- --------------------------------------------------------

--
-- Структура таблицы `product_groups`
--

CREATE TABLE `product_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `product_group_images`
--

CREATE TABLE `product_group_images` (
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_group_id` int(10) UNSIGNED NOT NULL,
  `level` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `product_group_views`
--

CREATE TABLE `product_group_views` (
  `product_group_id` int(10) UNSIGNED NOT NULL,
  `page_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `product_images`
--

CREATE TABLE `product_images` (
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `level` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `product_images`
--

INSERT INTO `product_images` (`name`, `product_id`, `level`) VALUES
('click-guard.jpg', 15, 0),
('laminat-amazone-33-kl-10mm-dub-2.jpg', 1, 1),
('laminat-amazone-33-kl-10mm-dub-3.jpg', 1, 2),
('laminat-amazone-33-kl-10mm-dub.jpg', 1, 0),
('laminat-kronotex-amazone-33-kl-10mm-dub-taho-d-4686-2.jpg', 8, 1),
('laminat-kronotex-amazone-33-kl-10mm-dub-taho-d-4686-3.jpg', 8, 2),
('laminat-kronotex-amazone-33-kl-10mm-dub-taho-d-4686.jpg', 8, 0),
('laminat-kronotex-amazone-dub-nebroskij-d-3668-2.jpg', 2, 1),
('laminat-kronotex-amazone-dub-nebroskij-d-3668-3.jpg', 2, 2),
('laminat-kronotex-amazone-dub-nebroskij-d-3668.jpg', 2, 0),
('laminat-kronotex-amazone-dub-portovyj-seryj-d-3572-2.jpg', 3, 1),
('laminat-kronotex-amazone-dub-portovyj-seryj-d-3572-3.jpg', 3, 2),
('laminat-kronotex-amazone-dub-portovyj-seryj-d-3572.jpg', 3, 0),
('laminat-kronotex-amazone-dub-prestizh-belyj-d-3239-2.jpg', 4, 1),
('laminat-kronotex-amazone-dub-prestizh-belyj-d-3239-3.jpg', 4, 2),
('laminat-kronotex-amazone-dub-prestizh-belyj-d-3239.jpg', 4, 0),
('laminat-kronotex-amazone-dub-prestizh-naturalnyj-d-4166-2.jpg', 5, 1),
('laminat-kronotex-amazone-dub-prestizh-naturalnyj-d-4166-3.jpg', 5, 2),
('laminat-kronotex-amazone-dub-prestizh-naturalnyj-d-4166.jpg', 5, 0),
('laminat-kronotex-amazone-dub-prestizh-seryj-d-4167-2.jpg', 7, 1),
('laminat-kronotex-amazone-dub-prestizh-seryj-d-4167-3.jpg', 7, 2),
('laminat-kronotex-amazone-dub-prestizh-seryj-d-4167.jpg', 7, 0),
('laminat-kronotex-amazone-dub-prestizh-svetlyj-d-416-2.jpg', 6, 1),
('laminat-kronotex-amazone-dub-prestizh-svetlyj-d-416-3.jpg', 6, 2),
('laminat-kronotex-amazone-dub-prestizh-svetlyj-d-416.jpg', 6, 0),
('plintus.jpg', 11, 0),
('plintus.jpg', 16, 0),
('plintus.jpg', 17, 0),
('plintus.jpg', 18, 0),
('plintus.jpg', 19, 0),
('plintus.jpg', 20, 0),
('plintus.jpg', 21, 0),
('profitex.jpg', 12, 0),
('quickstep.jpg', 13, 0),
('tuplex.jpg', 14, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `product_stocks`
--

CREATE TABLE `product_stocks` (
  `product_id` int(10) UNSIGNED NOT NULL,
  `quantity` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `product_stocks`
--

INSERT INTO `product_stocks` (`product_id`, `quantity`) VALUES
(1, 999),
(2, 999),
(3, 999),
(4, 999),
(5, 999),
(6, 999),
(7, 999),
(8, 999),
(11, 978),
(12, 993),
(13, 999),
(14, 999),
(15, 992),
(16, 999),
(17, 999),
(18, 999),
(19, 999),
(20, 999),
(21, 999);

-- --------------------------------------------------------

--
-- Структура таблицы `product_views`
--

CREATE TABLE `product_views` (
  `product_id` int(10) UNSIGNED NOT NULL,
  `page_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `product_views`
--

INSERT INTO `product_views` (`product_id`, `page_id`) VALUES
(12, 33),
(13, 34),
(14, 35),
(15, 37);

-- --------------------------------------------------------

--
-- Структура таблицы `purchased_bundles`
--

CREATE TABLE `purchased_bundles` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `purchased_products`
--

CREATE TABLE `purchased_products` (
  `purchased_bundle_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin');

-- --------------------------------------------------------

--
-- Структура таблицы `routes`
--

CREATE TABLE `routes` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `routes`
--

INSERT INTO `routes` (`id`, `name`) VALUES
(3, 'categories'),
(6, 'contactsPage'),
(5, 'mainPage'),
(4, 'page'),
(8, 'plinth'),
(1, 'product'),
(7, 'productGroup'),
(2, 'products');

-- --------------------------------------------------------

--
-- Структура таблицы `sales`
--

CREATE TABLE `sales` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `sales`
--

INSERT INTO `sales` (`id`, `customer_id`, `added_on`) VALUES
(7, 7, '2020-10-12 02:10:42'),
(8, 8, '2020-10-12 02:15:02'),
(9, 9, '2020-10-12 02:29:23'),
(10, 10, '2020-10-12 02:48:29'),
(11, 11, '2020-10-12 02:50:22'),
(12, 12, '2020-10-12 16:05:49'),
(13, 13, '2020-10-12 16:17:31'),
(14, 14, '2020-10-13 04:00:08'),
(15, 15, '2020-10-13 04:03:37'),
(16, 16, '2020-10-13 04:40:12'),
(17, 17, '2020-10-13 04:48:21'),
(18, 18, '2020-10-14 14:30:54'),
(19, 19, '2020-10-15 13:31:22'),
(20, 20, '2020-10-15 13:35:20'),
(21, 21, '2020-10-15 13:44:05'),
(22, 22, '2020-10-15 14:14:41'),
(23, 23, '2020-10-15 14:16:57'),
(24, 24, '2020-10-15 14:18:29'),
(25, 25, '2020-10-15 14:23:19'),
(26, 26, '2020-10-15 14:37:04'),
(27, 27, '2020-10-15 14:40:01');

-- --------------------------------------------------------

--
-- Структура таблицы `sale_statuses`
--

CREATE TABLE `sale_statuses` (
  `sale_id` int(10) UNSIGNED NOT NULL,
  `status_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sale_statuses`
--

INSERT INTO `sale_statuses` (`sale_id`, `status_id`) VALUES
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(27, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `services`
--

CREATE TABLE `services` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `services`
--

INSERT INTO `services` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Доставка', '2020-08-26 21:00:00', '2020-08-26 21:00:00'),
(2, 'Укладка ламината по прямой', '2020-09-18 19:17:11', '2020-09-18 19:21:09'),
(3, 'Укладка ламината по диагонали', '2020-09-18 19:23:24', '2020-09-18 19:23:24'),
(4, 'Укладка ламината одним полотном', '2020-09-18 19:29:06', '2020-09-18 19:29:06'),
(5, 'Установка ПВХ плинтуса', '2020-09-29 12:28:57', '2020-09-29 12:28:57'),
(6, 'Установка МДФ плинтуса Kronotex', '2020-10-09 16:33:51', '2020-10-09 16:33:51');

-- --------------------------------------------------------

--
-- Структура таблицы `service_characteristics`
--

CREATE TABLE `service_characteristics` (
  `service_id` int(10) UNSIGNED NOT NULL,
  `characteristic_id` int(10) UNSIGNED NOT NULL,
  `value` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `service_magazine_sales`
--

CREATE TABLE `service_magazine_sales` (
  `sale_id` int(10) UNSIGNED NOT NULL,
  `service_id` int(10) UNSIGNED NOT NULL,
  `service_price_history_id` int(10) UNSIGNED NOT NULL,
  `quantity` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `service_magazine_sales`
--

INSERT INTO `service_magazine_sales` (`sale_id`, `service_id`, `service_price_history_id`, `quantity`) VALUES
(7, 3, 10, 50),
(7, 5, 8, 50),
(8, 2, 9, 50),
(8, 6, 7, 50),
(9, 2, 9, 50),
(9, 6, 7, 50),
(10, 2, 9, 50),
(10, 5, 8, 50),
(11, 2, 9, 110),
(11, 5, 8, 110),
(12, 2, 9, 50),
(12, 5, 8, 50),
(13, 2, 9, 50),
(13, 5, 8, 50),
(14, 3, 10, 50),
(14, 5, 8, 50),
(15, 3, 10, 50),
(15, 5, 8, 50),
(16, 3, 10, 50),
(16, 5, 8, 50),
(17, 3, 10, 50),
(17, 5, 8, 50),
(18, 3, 10, 54),
(18, 5, 8, 54),
(19, 3, 10, 50),
(19, 6, 7, 50),
(20, 3, 10, 50),
(20, 6, 7, 50),
(21, 3, 10, 50),
(21, 6, 7, 50),
(22, 3, 10, 50),
(22, 6, 7, 50),
(23, 3, 10, 50),
(23, 6, 7, 50),
(24, 3, 10, 50),
(24, 6, 7, 50),
(25, 3, 10, 50),
(25, 6, 7, 50),
(26, 3, 10, 50),
(26, 6, 7, 50),
(27, 3, 10, 50),
(27, 6, 7, 50);

-- --------------------------------------------------------

--
-- Структура таблицы `service_prices`
--

CREATE TABLE `service_prices` (
  `service_id` int(10) UNSIGNED NOT NULL,
  `service_price_history_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `service_prices`
--

INSERT INTO `service_prices` (`service_id`, `service_price_history_id`) VALUES
(1, 1),
(4, 5),
(6, 7),
(5, 8),
(2, 9),
(3, 10);

-- --------------------------------------------------------

--
-- Структура таблицы `service_price_histories`
--

CREATE TABLE `service_price_histories` (
  `id` int(10) UNSIGNED NOT NULL,
  `service_id` int(10) UNSIGNED NOT NULL,
  `price` int(11) NOT NULL,
  `actual_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `service_price_histories`
--

INSERT INTO `service_price_histories` (`id`, `service_id`, `price`, `actual_on`) VALUES
(1, 1, 0, '2020-08-27 15:12:15'),
(2, 2, 10000, '2020-09-18 19:17:12'),
(3, 3, 28000, '2020-09-18 19:23:24'),
(4, 2, 22000, '2020-09-18 19:23:51'),
(5, 4, 30000, '2020-09-18 19:29:06'),
(6, 5, 9000, '2020-09-29 12:28:57'),
(7, 6, 20000, '2020-10-09 16:33:51'),
(8, 5, 10000, '2020-10-09 16:52:58'),
(9, 2, 25000, '2020-10-09 17:01:23'),
(10, 3, 32000, '2020-10-09 17:02:12');

-- --------------------------------------------------------

--
-- Структура таблицы `service_units`
--

CREATE TABLE `service_units` (
  `service_id` int(10) UNSIGNED NOT NULL,
  `unit_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `service_units`
--

INSERT INTO `service_units` (`service_id`, `unit_id`) VALUES
(2, 3),
(3, 3),
(4, 3),
(5, 6),
(6, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `statuses`
--

CREATE TABLE `statuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `statuses`
--

INSERT INTO `statuses` (`id`, `name`) VALUES
(1, 'Обрабатывается'),
(2, 'Оплачен');

-- --------------------------------------------------------

--
-- Структура таблицы `top_menu_categories`
--

CREATE TABLE `top_menu_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(11) NOT NULL,
  `sort` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `units`
--

CREATE TABLE `units` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reduction` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `units`
--

INSERT INTO `units` (`id`, `code`, `name`, `reduction`) VALUES
(1, 778, 'Упаковка', 'упак'),
(2, 3, 'Миллиметр', 'мм'),
(3, 55, 'Квадратный метр', 'м<sup>2</sup>'),
(4, 166, 'Килограмм', 'кг'),
(5, 796, 'Штука', 'шт'),
(6, 6, 'Метр', 'м');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET cp1251 NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'protopopov-alexey@bk.ru', '$2y$10$fQ/Xl.KKi1hViMFRw8wjtudJ81hnRE5F.vRvBuwCcS1L92Jtv2W9W', 'nTQ3dkDEwmEEY7prkfQSjaBY3cpEeU2yB6b25JgddsW8BQRQ56JSzWsdFKeH', '2020-08-16 18:51:31', '2020-08-16 18:51:31');

-- --------------------------------------------------------

--
-- Структура таблицы `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `categories_views`
--
ALTER TABLE `categories_views`
  ADD PRIMARY KEY (`category_id`,`page_id`),
  ADD KEY `categories_views_page_id_foreign` (`page_id`);

--
-- Индексы таблицы `category_characteristics`
--
ALTER TABLE `category_characteristics`
  ADD PRIMARY KEY (`category_id`,`characteristic_id`),
  ADD KEY `category_characteristics_characteristic_id_foreign` (`characteristic_id`);

--
-- Индексы таблицы `category_images`
--
ALTER TABLE `category_images`
  ADD PRIMARY KEY (`name`,`category_id`),
  ADD KEY `category_images_category_id_foreign` (`category_id`);

--
-- Индексы таблицы `category_prices`
--
ALTER TABLE `category_prices`
  ADD PRIMARY KEY (`category_id`);

--
-- Индексы таблицы `category_services`
--
ALTER TABLE `category_services`
  ADD PRIMARY KEY (`category_id`,`service_id`),
  ADD KEY `category_services_service_id_foreign` (`service_id`);

--
-- Индексы таблицы `characteristics`
--
ALTER TABLE `characteristics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `unit_id` (`unit_id`);

--
-- Индексы таблицы `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `group_products`
--
ALTER TABLE `group_products`
  ADD PRIMARY KEY (`product_group_id`,`product_id`),
  ADD KEY `group_products_product_id_foreign` (`product_id`);

--
-- Индексы таблицы `laminate_product_views`
--
ALTER TABLE `laminate_product_views`
  ADD PRIMARY KEY (`page_id`,`product_id`),
  ADD KEY `laminate_views_product_id_foreign` (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `magazine_sales`
--
ALTER TABLE `magazine_sales`
  ADD PRIMARY KEY (`sale_id`,`product_id`),
  ADD KEY `magazine_sales_product_id_foreign` (`product_id`),
  ADD KEY `magazine_sales_price_history_id_foreign` (`price_history_id`);

--
-- Индексы таблицы `menu_categories`
--
ALTER TABLE `menu_categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `menu_images`
--
ALTER TABLE `menu_images`
  ADD PRIMARY KEY (`name`,`menu_category_id`),
  ADD KEY `menu_images_menu_category_id_foreign` (`menu_category_id`);

--
-- Индексы таблицы `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_items_page_id_foreign` (`page_id`),
  ADD KEY `menu_items_parent_id_index` (`parent_id`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_uri_unique` (`uri`) USING BTREE;

--
-- Индексы таблицы `page_parameters`
--
ALTER TABLE `page_parameters`
  ADD KEY `page_parameters_page_id_foreign` (`page_id`);

--
-- Индексы таблицы `page_routes`
--
ALTER TABLE `page_routes`
  ADD PRIMARY KEY (`route_id`,`page_id`),
  ADD KEY `page_routes_page_id_foreign` (`page_id`);

--
-- Индексы таблицы `page_views`
--
ALTER TABLE `page_views`
  ADD KEY `page_views_page_id_foreign` (`page_id`);

--
-- Индексы таблицы `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`(191));

--
-- Индексы таблицы `plinth_views`
--
ALTER TABLE `plinth_views`
  ADD PRIMARY KEY (`product_id`,`page_id`),
  ADD KEY `plinth_views_page_id_foreign` (`page_id`);

--
-- Индексы таблицы `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `prices_price_history_id_foreign` (`price_history_id`);

--
-- Индексы таблицы `price_histories`
--
ALTER TABLE `price_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `price_histories_product_id_foreign` (`product_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_unit_id_foreign` (`unit_id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Индексы таблицы `products_views`
--
ALTER TABLE `products_views`
  ADD PRIMARY KEY (`category_id`,`page_id`),
  ADD KEY `products_views_page_id_foreign` (`page_id`);

--
-- Индексы таблицы `product_characteristics`
--
ALTER TABLE `product_characteristics`
  ADD PRIMARY KEY (`product_id`,`characteristic_id`),
  ADD KEY `product_characteristics_characteristic_id_foreign` (`characteristic_id`);

--
-- Индексы таблицы `product_groups`
--
ALTER TABLE `product_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_groups_category_id_foreign` (`category_id`);

--
-- Индексы таблицы `product_group_images`
--
ALTER TABLE `product_group_images`
  ADD PRIMARY KEY (`name`,`product_group_id`),
  ADD KEY `product_group_images_product_group_id_foreign` (`product_group_id`);

--
-- Индексы таблицы `product_group_views`
--
ALTER TABLE `product_group_views`
  ADD PRIMARY KEY (`product_group_id`,`page_id`),
  ADD KEY `product_group_views_page_id_foreign` (`page_id`);

--
-- Индексы таблицы `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`name`,`product_id`),
  ADD KEY `product_images_product_id_foreign` (`product_id`);

--
-- Индексы таблицы `product_stocks`
--
ALTER TABLE `product_stocks`
  ADD PRIMARY KEY (`product_id`);

--
-- Индексы таблицы `product_views`
--
ALTER TABLE `product_views`
  ADD PRIMARY KEY (`product_id`,`page_id`),
  ADD KEY `product_views_page_id_foreign` (`page_id`);

--
-- Индексы таблицы `purchased_bundles`
--
ALTER TABLE `purchased_bundles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `purchased_products`
--
ALTER TABLE `purchased_products`
  ADD PRIMARY KEY (`purchased_bundle_id`,`product_id`),
  ADD KEY `purchased_products_product_id_foreign` (`product_id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `routes_name_unique` (`name`);

--
-- Индексы таблицы `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_customer_id_foreign` (`customer_id`);

--
-- Индексы таблицы `sale_statuses`
--
ALTER TABLE `sale_statuses`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `sale_statuses_status_id_foreign` (`status_id`);

--
-- Индексы таблицы `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `service_characteristics`
--
ALTER TABLE `service_characteristics`
  ADD PRIMARY KEY (`service_id`,`characteristic_id`),
  ADD KEY `service_characteristics_characteristic_id_foreign` (`characteristic_id`);

--
-- Индексы таблицы `service_magazine_sales`
--
ALTER TABLE `service_magazine_sales`
  ADD PRIMARY KEY (`sale_id`,`service_id`),
  ADD KEY `service_magazine_sales_service_id_foreign` (`service_id`) USING BTREE,
  ADD KEY `service_magazine_sales_price_history_id_foreign` (`service_price_history_id`) USING BTREE;

--
-- Индексы таблицы `service_prices`
--
ALTER TABLE `service_prices`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `service_prices_service_price_history_id_foreign` (`service_price_history_id`);

--
-- Индексы таблицы `service_price_histories`
--
ALTER TABLE `service_price_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_price_histories_service_id_foreign` (`service_id`);

--
-- Индексы таблицы `service_units`
--
ALTER TABLE `service_units`
  ADD PRIMARY KEY (`service_id`,`unit_id`),
  ADD KEY `service_units_unit_id_foreign` (`unit_id`);

--
-- Индексы таблицы `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `top_menu_categories`
--
ALTER TABLE `top_menu_categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Индексы таблицы `user_roles`
--
ALTER TABLE `user_roles`
  ADD KEY `user_roles_user_id_foreign` (`user_id`),
  ADD KEY `user_roles_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `characteristics`
--
ALTER TABLE `characteristics`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT для таблицы `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `menu_categories`
--
ALTER TABLE `menu_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT для таблицы `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT для таблицы `price_histories`
--
ALTER TABLE `price_histories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `product_groups`
--
ALTER TABLE `product_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `purchased_bundles`
--
ALTER TABLE `purchased_bundles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `services`
--
ALTER TABLE `services`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `service_price_histories`
--
ALTER TABLE `service_price_histories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `top_menu_categories`
--
ALTER TABLE `top_menu_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `units`
--
ALTER TABLE `units`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `categories_views`
--
ALTER TABLE `categories_views`
  ADD CONSTRAINT `categories_views_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `categories_views_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `category_characteristics`
--
ALTER TABLE `category_characteristics`
  ADD CONSTRAINT `category_characteristics_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `category_characteristics_characteristic_id_foreign` FOREIGN KEY (`characteristic_id`) REFERENCES `characteristics` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `category_images`
--
ALTER TABLE `category_images`
  ADD CONSTRAINT `category_images_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `category_prices`
--
ALTER TABLE `category_prices`
  ADD CONSTRAINT `category_prices_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `category_services`
--
ALTER TABLE `category_services`
  ADD CONSTRAINT `category_services_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `category_services_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `characteristics`
--
ALTER TABLE `characteristics`
  ADD CONSTRAINT `characteristics_ibfk_1` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `group_products`
--
ALTER TABLE `group_products`
  ADD CONSTRAINT `group_products_product_group_id_foreign` FOREIGN KEY (`product_group_id`) REFERENCES `product_groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `laminate_product_views`
--
ALTER TABLE `laminate_product_views`
  ADD CONSTRAINT `laminate_product_views_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `laminate_views_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `laminate_views_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `magazine_sales`
--
ALTER TABLE `magazine_sales`
  ADD CONSTRAINT `magazine_sales_price_history_id_foreign` FOREIGN KEY (`price_history_id`) REFERENCES `price_histories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `magazine_sales_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `magazine_sales_sale_id_foreign` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `menu_images`
--
ALTER TABLE `menu_images`
  ADD CONSTRAINT `menu_images_menu_category_id_foreign` FOREIGN KEY (`menu_category_id`) REFERENCES `menu_categories` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `page_parameters`
--
ALTER TABLE `page_parameters`
  ADD CONSTRAINT `page_parameters_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `page_routes`
--
ALTER TABLE `page_routes`
  ADD CONSTRAINT `page_routes_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `page_routes_route_id_foreign` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `page_views`
--
ALTER TABLE `page_views`
  ADD CONSTRAINT `page_views_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `plinth_views`
--
ALTER TABLE `plinth_views`
  ADD CONSTRAINT `plinth_views_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `plinth_views_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `prices`
--
ALTER TABLE `prices`
  ADD CONSTRAINT `prices_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `prices_price_history_id_foreign` FOREIGN KEY (`price_history_id`) REFERENCES `price_histories` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `price_histories`
--
ALTER TABLE `price_histories`
  ADD CONSTRAINT `price_histories_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products_views`
--
ALTER TABLE `products_views`
  ADD CONSTRAINT `products_views_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_views_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_characteristics`
--
ALTER TABLE `product_characteristics`
  ADD CONSTRAINT `product_characteristics_characteristic_id_foreign` FOREIGN KEY (`characteristic_id`) REFERENCES `characteristics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_characteristics_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_groups`
--
ALTER TABLE `product_groups`
  ADD CONSTRAINT `product_groups_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_group_images`
--
ALTER TABLE `product_group_images`
  ADD CONSTRAINT `product_group_images_product_group_id_foreign` FOREIGN KEY (`product_group_id`) REFERENCES `product_groups` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_group_views`
--
ALTER TABLE `product_group_views`
  ADD CONSTRAINT `product_group_views_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_group_views_product_group_id_foreign` FOREIGN KEY (`product_group_id`) REFERENCES `product_groups` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_stocks`
--
ALTER TABLE `product_stocks`
  ADD CONSTRAINT `product_stocks_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_views`
--
ALTER TABLE `product_views`
  ADD CONSTRAINT `product_views_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_views_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `purchased_products`
--
ALTER TABLE `purchased_products`
  ADD CONSTRAINT `purchased_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `purchased_products_purchased_bundle_id_foreign` FOREIGN KEY (`purchased_bundle_id`) REFERENCES `purchased_bundles` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `service_characteristics`
--
ALTER TABLE `service_characteristics`
  ADD CONSTRAINT `service_characteristics_characteristic_id_foreign` FOREIGN KEY (`characteristic_id`) REFERENCES `characteristics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `service_characteristics_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `service_magazine_sales`
--
ALTER TABLE `service_magazine_sales`
  ADD CONSTRAINT `service_magazine_sales_sale_id_foreign` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `service_magazine_sales_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `service_magazine_sales_service_price_history_id_foreign` FOREIGN KEY (`service_price_history_id`) REFERENCES `service_price_histories` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `service_prices`
--
ALTER TABLE `service_prices`
  ADD CONSTRAINT `service_prices_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `service_prices_service_price_history_id_foreign` FOREIGN KEY (`service_price_history_id`) REFERENCES `service_price_histories` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `service_price_histories`
--
ALTER TABLE `service_price_histories`
  ADD CONSTRAINT `service_price_histories_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `service_units`
--
ALTER TABLE `service_units`
  ADD CONSTRAINT `service_units_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `service_units_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
