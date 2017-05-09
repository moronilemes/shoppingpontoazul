<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
//use yii\bootstrap\Nav;
//use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use app\models\Category;

$categories = Category::find()->all();

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
    
    <!-- Custom styles for this template -->
    <link href="/css/custom-public.css" rel="stylesheet">
    
</head>
<body class="nav-md">
<?php $this->beginBody() ?>


    
    <div class="container">
        

<div class="navbar-wrapper">
      <div class="container-fluid">

        <nav class="navbar navbar-default">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Navegação</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="/">Shopping Ponto Azul</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <form class="navbar-form navbar-left" role="search"> 
                    <div class="form-group">
                        <div class="input-group">
                            <input type="text" class="form-control main-search-input" id="exampleInputAmount" placeholder="">
                            <div class="input-group-addon"><span class='glyphicon glyphicon-search'></span></div>
                        </div>
                    </div> 
                </form>
                <ul class="nav navbar-nav navbar-right">
                    <li class=""><a href="/store-category/show/">Lojas</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Produtos<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <?php
                                foreach($categories as $thisCategory){
                                    echo "<li><a href='/store-category/show/".$thisCategory->id."'>".$thisCategory->name."</a></li>";
                                }    
                            ?>
                        </ul>
                    </li>                
                </ul>
            </div>
          </div>
        </nav>

      </div>
    </div>


    <!-- Carousel
    ================================================== -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
<!--        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>-->
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img class="first-slide" src="http://lorempixel.com/1400/450/fashion/" alt="First slide">
          <div class="container">
            <div class="carousel-caption">
              <h1>Seja bem-vindo!</h1>
              <p>                
                Nossas lojas populares estão de portas abertas para te receber
              </p>
              <p><a class="btn btn-lg btn-primary" href="/store-category/show/" role="button">Ver lojas</a></p>
            </div>
          </div>
        </div>      
      </div>
<!--      <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>-->
    </div><!-- /.carousel -->
    <div class="container top-ad">
<!--        <div class="row">
            <div class="col-sm-12">
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                  general 
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-8990393761638596"
                     data-ad-slot="3920931637"
                     data-ad-format="auto"></ins>
                <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
        </div>-->
    </div>

    <div class="container marketing">        
        <?= $content ?>
    </div>
    
    
    </div>
        
        <footer>
            <div class="clearfix"></div>
            <div>
                
            </div>
            <div class="">
                &copy; Shopping Ponto Azul <?= date('Y') ?> || 
                <a href="/site/login/">Login</a>
            </div>
        </footer>
        
      
    </div>


    
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>

