<?php 
	include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
	if(isset($_GET['move'])){
		if($_GET['move'] == 'email'){
			$notif = new Notifications();
			$notif->send_contact_email($_POST['email'], $_POST['name'], $_POST['city'], $_POST['text']);
		}
	}
	$title = "Контакты";
	include_once("header.php") ?>
		<div class="s1-contacts">
			<div class="container w-container">
				<div class="s1-wrap">
					<div class="menu-block-riding-hall"><a href="/" class="menu-link">Горыныч</a><a href="/school.php" class="menu-link">Школа</a><a href="/malinovo.php" class="menu-link">Малиново</a><a href="/riding-hall.php" class="menu-link">Манеж</a><a href="/rentals.php" class="menu-link">аренда<br></a><a href="/shares.php" class="menu-link">Акции</a><a href="/photo.php" class="menu-link">фото</a><a href="/contacts.php" aria-current="page" class="menu-link w--current">Контакты</a></div>
					<div class="offers-wrap"><a href="/rentals.php" class="offers-link-block w-inline-block"><div class="offers-desc">Аренда домика</div><img src="images/Group20(2).png" loading="lazy" alt="" class="vektor-1"></a><a href="rentals.php" class="offers-link-block w-inline-block"><div class="offers-desc">запись на пастьбу</div><img src="images/Group20(3).png" loading="lazy" alt="" class="vektor-2"></a><a href="/shares.php" class="offers-link-block w-inline-block"><div class="offers-desc">наши акции</div><img src="images/gift201.png" loading="lazy" alt="" class="vektor-3"></a></div>
				</div>
			</div>
		</div>
		<div class="s2-contacts">
			<div class="container w-container">
				<div class="s2-wrap">
					<h1 class="h1">Контакты</h1>
					<div class="wrap-contact-content">
						<div class="contact-block">
							<div class="phone-contact-block"><img src="images/Vector.png" loading="lazy" alt="" class="phone-img"><a href="tel:+7(904)599-57-82" class="phone-link-contacts">+7 (904) 599-57-82<br></a></div>
							<div class="address-contact-block"><img src="images/map20icon.png" loading="lazy" alt="" class="footer-met">
								<div class="addres-link-contacts">Владимирская обл., Александровский район, с. Махра, ул. Заречная, АТК "Горыныч"</div>
							</div>
							<div class="mail-contact-block"><img src="images/Vector-1.png" loading="lazy" alt="" class="mail-img"><a href="mailto:gorynychclub@gmail.com" class="mail-link-contacts">gorynychclub@gmail.com<br></a></div>
							<div class="contacts-sep"></div>
							<div class="subtitle">МЫ В СОЦСЕТЯХ</div>
							<div class="social-network-contact">Мы в <a href="https://www.facebook.com/atk.gorynych" target="_blank" class="social-network-contact-link">Facebook</a></div>
							<div class="social-network-contact">Мы в <a href="https://vk.com/gorinytch" target="_blank" class="social-network-contact-link">ВКонтакте</a></div>
							<div class="social-network-contact">Мы в <a href="https://www.instagram.com/gorinich_atk/" target="_blank" class="social-network-contact-link">Инстаграм</a></div>
						</div>
						<div class="contacts-map-block"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2494.8165809243264!2d38.66689171299163!3d56.273520018597374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414c65461917caa9%3A0x6bd47c87c46b15e6!2z0JDQs9GA0L7RgtGD0YDQuNGB0YLQuNGH0LXRgdC60LjQuSDQutC-0LzQv9C70LXQutGBINCT0L7RgNGL0L3Ri9GH!5e0!3m2!1sru!2sru!4v1625925636135!5m2!1sru!2sru" height="100%" style="border:0;width:100%;" allowfullscreen="" loading="lazy"></iframe></div>

					</div>
				</div>
			</div>
		</div>
		<div class="s3-contacts">
			<div class="container w-container">
				<div class="form-block w-form">
					<form action="?move=email" method="POST" id="email-form" name="email-form" data-name="Email Form" action="/">
						<div class="header-form wite">Написать нам сообщение</div><input type="text" name="name" class="name w-input" maxlength="256" data-name="Имя" placeholder="Имя" id="node-4"><input type="email"  class="e-mail w-input" maxlength="256" name="email" data-name="E-mail" placeholder="E-mail" id="E-mail" required=""><input type="text" name="city" class="city w-input" maxlength="256" data-name="Город" placeholder="Город" id="node-2" required=""><input type="text" name="text" class="your-message w-input" maxlength="256" data-name="Ваше сообщение" placeholder="Ваше сообщение" id="node" required="">
						<div class="w-form-formrecaptcha recaptcha g-recaptcha g-recaptcha-error g-recaptcha-disabled g-recaptcha-invalid-key"></div><input type="submit" value="Отправить" data-wait="Пожалуйста подождите..." class="submit-button w-button"></form>
					<div class="w-form-done">
						<div>Thank you! Your submission has been received!</div>
					</div>
					<div class="w-form-fail">
						<div>Oops! Something went wrong while submitting the form.</div>
					</div>
				</div>
			</div>
		</div>
<?php include_once("footer.php") ?>
