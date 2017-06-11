<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
//use yii\bootstrap\Nav;
//use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
$session = Yii::$app->session;

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>

</head>
<body class="nav-md">
<?php $this->beginBody() ?>

<div class="container body">

    <div class="main_container">
        <div class="col-md-3 left_col menu_fixed">
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
                <a href="/dashboard/index" class="site_title"><img src="/images/logo-shopping-ponto-azul.jpg" alt="zizap" /></a>
            </div>

            <div class="clearfix"></div>
            <br />

<!--             sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <ul class="nav side-menu">

                    <?php if ($session['role'] == 'admin') { ?>

                    <!--<li><a><i class="fa fa-smile-o"></i> <?=Yii::t('app', 'Administration')?> <span class="fa fa-chevron-down"></span></a>-->
                    <ul class="nav">
                        <li><a href="/user/"><?=Yii::t('app', 'User')?></a></li>
                        <li><a href="/store"><?=Yii::t('app', 'Store')?></a></li>
                        <li><a href="/category"><?=Yii::t('app', 'Category')?></a></li>
                        <li><a href="/user-store-role"><?=Yii::t('app', 'Assign users to stores')?></a></li>
                        <li><a href="/store-category"><?=Yii::t('app', 'Assign categories to stores')?></a></li>
                        <li><a href="/log"><?=Yii::t('app', 'Logs')?><a></li>
                        <!--      <?php if(Yii::$app->user->isGuest){ ?>
                              <?php } else {
                                              echo '<li>'
                                              . Html::beginForm(['/site/logout'], 'post')
                                              . Html::submitButton(
                                                      'Logout (' . Yii::$app->user->identity->username . ')',
                                                      ['class' => 'btn btn-link logout']
                                              )
                                              . Html::endForm()
                                              . '</li>';
                        } ?>-->
                    </ul>
                    <!--</li>-->
                    <?php } else {?>
                    <!--<li class="active"><a><i class="fa fa-home"></i> <?=Yii::t('app', 'Dashboard')?> <span class="fa fa-chevron-down"></span></a>-->
                        <ul class="nav">
                            <li class="current-page"><a href="/chat/panel"><?=Yii::t('app', 'Chat')?></a></li>
                            <!--<li><a href="/product/panel/"><?=Yii::t('app', 'Products')?></a></li>-->
                            <li><a href="/product"><?=Yii::t('app', 'Products')?></a></li>
                        </ul>
                    <!--</li>-->
                    <?php } ?>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <nav>
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>

              <ul class="nav navbar-nav navbar-right">
                <li class="">
                    <!--<a href="/dashboard/javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                      <img src="/images/img.jpg" alt="">
                      <?php if(Yii::$app->user->isGuest){ ?>
                              Login
                      <?php } else {
                              echo Yii::$app->user->identity->username;
                      } ?>
                      <span class=" fa fa-angle-down"></span>
                    </a>-->

                    <?php if(Yii::$app->user->isGuest){ ?>
                            <a href="/site/login/" class="user-profile" aria-expanded="false">
                                <?=Yii::t('app', 'Login')?>
                            </a>
                    <?php } else { ?>
                        <a href="/dashboard/javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <!--<img src="/images/img.jpg" alt="">-->
                            <?php
                                echo Yii::$app->user->identity->username
                            ?>
                            <span class=" fa fa-angle-down"></span>
                        </a>
                    <?php } ?>




                  <ul class="dropdown-menu dropdown-usermenu pull-right">

                    <?php if(Yii::$app->user->isGuest){ ?>
                            <li><a href="/site/login"><?=Yii::t('app', 'Login')?></a></li>
                    <?php } else {
                            echo '<li>'
                            . Html::beginForm(['/site/logout'], 'post')
                            . Html::submitButton(
                                    Yii::t('app', 'Logout'),
                                    ['class' => 'btn btn-link logout']
                            )
                            . Html::endForm()
                            . '</li>';
                    } ?>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- /top navigation -->


    <div class="right_col" role="main">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>

        <?= $content ?>
    </div>


</div>




        <footer>
          <div class="pull-right">
            &copy; <?=Yii::t('app', 'Shopping Ponto Azul')?> <?= date('Y') ?>
          </div>
          <div class="clearfix"></div>
        </footer>

      </div>
    </div>



<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
