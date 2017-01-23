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
                <a href="/dashboard/index" class="site_title"><img src="/images/logo.jpg" alt="zizap" /></a>
            </div>

            <div class="clearfix"></div>

<!--             menu profile quick info -->
<!--            <div class="profile clearfix">
              <div class="profile_pic">
                <img src="/images/img.jpg" alt="..." class="img-circle profile_img">
              </div>
              <div class="profile_info">
                <span>Welcome,</span>
                <h2>John Doe</h2>
              </div>
            </div>-->
<!--             /menu profile quick info -->

            <br />
	
<!--             sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
<!--                <h3>General</h3>-->
                <ul class="nav side-menu">
                    <li><a><i class="fa fa-smile-o"></i> Gerenciamento <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
<!--                        <li><a href="/site/index">Home</a></li>
                        <li><a href="/site/about">About</a></li>
                        <li><a href="/site/contact">Contact</a></li>-->
                        <li><a href="/site/signup">New User</a></li>
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
                  <li><a><i class="fa fa-home"></i> Dashboard <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                        <li><a href="/dashboard/dashboard">Dashboard</a></li>
                        <li><a href="/dashboard/product">Products</a></li>
                        <li><a href="/dashboard/order">Orders</a></li>
                        <li><a href="/dashboard/financial">Financial</a></li>
                        <li><a href="/dashboard/metrics">Metrics</a></li>
                        <li><a href="/dashboard/relationship">Relationship</a></li>
                        <li><a href="/dashboard/setting">Settings</a></li>
                        <li><a href="/dashboard/account">Account</a></li>
                    </ul>
                  </li>
                  <!--
                  <li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="/dashboard/index">Dashboard</a></li>
                      <li><a href="/dashboard/index2">Dashboard2</a></li>
                      <li><a href="/dashboard/index3">Dashboard3</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-edit"></i> Forms <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="/dashboard/form">General Form</a></li>
                      <li><a href="/dashboard/form_advanced">Advanced Components</a></li>
                      <li><a href="/dashboard/form_validation">Form Validation</a></li>
                      <li><a href="/dashboard/form_wizards">Form Wizard</a></li>
                      <li><a href="/dashboard/form_upload">Form Upload</a></li>
                      <li><a href="/dashboard/form_buttons">Form Buttons</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-desktop"></i> UI Elements <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="/dashboard/general_elements">General Elements</a></li>
                      <li><a href="/dashboard/media_gallery">Media Gallery</a></li>
                      <li><a href="/dashboard/typography">Typography</a></li>
                      <li><a href="/dashboard/icons">Icons</a></li>
                      <li><a href="/dashboard/glyphicons">Glyphicons</a></li>
                      <li><a href="/dashboard/widgets">Widgets</a></li>
                      <li><a href="/dashboard/invoice">Invoice</a></li>
                      <li><a href="/dashboard/inbox">Inbox</a></li>
                      <li><a href="/dashboard/calendar">Calendar</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-table"></i> Tables <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="/dashboard/tables">Tables</a></li>
                      <li><a href="/dashboard/tables_dynamic">Table Dynamic</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-bar-chart-o"></i> Data Presentation <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="/dashboard/chartjs">Chart JS</a></li>
                      <li><a href="/dashboard/chartjs2">Chart JS2</a></li>
                      <li><a href="/dashboard/morisjs">Moris JS</a></li>
                      <li><a href="/dashboard/echarts">ECharts</a></li>
                      <li><a href="/dashboard/other_charts">Other Charts</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-clone"></i>Layouts <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="/dashboard/fixed_sidebar">Fixed Sidebar</a></li>
                      <li><a href="/dashboard/fixed_footer">Fixed Footer</a></li>
                    </ul>
                  </li>
                  -->
                </ul>
              </div>
                <!--
              <div class="menu_section">
                <h3>Live On</h3>
                <ul class="nav side-menu">
                  <li><a><i class="fa fa-bug"></i> Additional Pages <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="/dashboard/e_commerce">E-commerce</a></li>
                      <li><a href="/dashboard/projects">Projects</a></li>
                      <li><a href="/dashboard/project_detail">Project Detail</a></li>
                      <li><a href="/dashboard/contacts">Contacts</a></li>
                      <li><a href="/dashboard/profile">Profile</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-windows"></i> Extras <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="/dashboard/page_403">403 Error</a></li>
                      <li><a href="/dashboard/page_404">404 Error</a></li>
                      <li><a href="/dashboard/page_500">500 Error</a></li>
                      <li><a href="/dashboard/plain_page">Plain Page</a></li>
                      <li><a href="/dashboard/login">Login Page</a></li>
                      <li><a href="/dashboard/pricing_tables">Pricing Tables</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-sitemap"></i> Multilevel Menu <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                        <li><a href="/dashboard/#level1_1">Level One</a>
                        <li><a>Level One<span class="fa fa-chevron-down"></span></a>
                          <ul class="nav child_menu">
                            <li class="sub_menu"><a href="/dashboard/level2">Level Two</a>
                            </li>
                            <li><a href="/dashboard/#level2_1">Level Two</a>
                            </li>
                            <li><a href="/dashboard/#level2_2">Level Two</a>
                            </li>
                          </ul>
                        </li>
                        <li><a href="/dashboard/#level1_2">Level One</a>
                        </li>
                    </ul>
                  </li>                  
                  <li><a href="/dashboard/javascript:void(0)"><i class="fa fa-laptop"></i> Landing Page <span class="label label-success pull-right">Coming Soon</span></a></li>
                </ul>
              </div>
                -->
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
