<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
//use yii\bootstrap\Nav;
//use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
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
<!--              <a href="/dashboard/index" class="site_title"><i class="fa fa-paw"></i> <span>Gentelella Alela!</span></a>-->
                <a href="/dashboard/index" class="site_title"><img src="/images/logo-shopping-ponto-azul.jpg" alt="zizap" /></a>
            </div>

            <div class="clearfix"></div>
            <br />
	
<!--             sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <ul class="nav side-menu">
                    <li><a><i class="fa fa-home"></i> Dashboard <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li><a href="/dashboard/dashboard">Dashboard</a></li>
                            <li><a href="/dashboard/product">Products</a></li>
                        </ul>
                    </li>
                    <li><a><i class="fa fa-smile-o"></i> Administration <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
<!--                        <li><a href="/site/index">Home</a></li>
                        <li><a href="/site/about">About</a></li>
                        <li><a href="/site/contact">Contact</a></li>-->
                        <li><a href="/user/">User</a></li>
                        <li><a href="/store">Store</a></li>
                        <li><a href="/user-store-role">Assignment</a></li>
                        <!--      <?php if(Yii::$app->user->isGuest){ ?>
                                      <li><a href="/site/login">Login</a></li>
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
                  </li>
                  
               
                </ul>
              </div>
              
            </div>
            <div class="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock">
                <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Logout">
                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
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
                                Login
                            </a>
                    <?php } else { ?>
                        <a href="/dashboard/javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <img src="/images/img.jpg" alt="">
                            <?php 
                                echo Yii::$app->user->identity->username
                            ?>
                            <span class=" fa fa-angle-down"></span>
                        </a>
                    <?php } ?>
                    
                    
                    
                    
                  <ul class="dropdown-menu dropdown-usermenu pull-right">
                    <!--<li><a href="/site/index">Home</a></li>
                    <li><a href="/site/about">About</a></li>
                    <li><a href="/site/contact">Contact</a></li>
                    <li><a href="/site/signup">New User</a></li>
                    <li><a href="/store">Store</a></li>
                    <li><a href="/user-store-role">Assignment</a></li>-->
                    
                    <li><a href="/dashboard/profile"> Profile</a></li>
                    <li><a href="/dashboard/settings"><span>Settings</span></a></li>
                    <?php if(Yii::$app->user->isGuest){ ?>
                            <li><a href="/site/login">Login</a></li>
                    <?php } else { 
                                    echo '<li>'
                                    . Html::beginForm(['/site/logout'], 'post')
                                    . Html::submitButton(
                                            'Logout',
                                            ['class' => 'btn btn-link logout']
                                    )
                                    . Html::endForm()
                                    . '</li>';
                    } ?>
                  </ul>
                </li>
                                

                <li role="presentation" class="dropdown">
                  <a href="/dashboard/javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-envelope-o"></i>
                    <span class="badge bg-green">6</span>
                  </a>
                  <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
                    <li>
                      <a>
                        <span class="image"><img src="/images/img.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                        <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span class="image"><img src="/images/img.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                        <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span class="image"><img src="/images/img.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                        <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span class="image"><img src="/images/img.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                        <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li>
                      <div class="text-center">
                        <a>
                          <strong>See All Alerts</strong>
                          <i class="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </li>
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
            &copy; Zizap <?= date('Y') ?>
          </div>
          <div class="clearfix"></div>
        </footer>
        
      </div>
    </div>


    
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
